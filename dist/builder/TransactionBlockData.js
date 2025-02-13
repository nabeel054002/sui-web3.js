"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionBlockDataBuilder = exports.SerializedTransactionDataBuilder = exports.TransactionExpiration = void 0;
const bcs_1 = require("@mysten/bcs");
const superstruct_1 = require("superstruct");
const hash_1 = require("./hash");
const index_1 = require("../types/index");
const bcs_2 = require("./bcs");
const Transactions_1 = require("./Transactions");
const Inputs_1 = require("./Inputs");
const utils_1 = require("./utils");
const sui_types_1 = require("../utils/sui-types");
exports.TransactionExpiration = (0, superstruct_1.optional)((0, superstruct_1.nullable)((0, superstruct_1.union)([
    (0, superstruct_1.object)({ Epoch: (0, superstruct_1.integer)() }),
    (0, superstruct_1.object)({ None: (0, superstruct_1.union)([(0, superstruct_1.literal)(true), (0, superstruct_1.literal)(null)]) }),
])));
const StringEncodedBigint = (0, superstruct_1.define)('StringEncodedBigint', (val) => {
    if (!['string', 'number', 'bigint'].includes(typeof val))
        return false;
    try {
        BigInt(val);
        return true;
    }
    catch {
        return false;
    }
});
const GasConfig = (0, superstruct_1.object)({
    budget: (0, superstruct_1.optional)(StringEncodedBigint),
    price: (0, superstruct_1.optional)(StringEncodedBigint),
    payment: (0, superstruct_1.optional)((0, superstruct_1.array)(index_1.SuiObjectRef)),
    owner: (0, superstruct_1.optional)((0, superstruct_1.string)()),
});
exports.SerializedTransactionDataBuilder = (0, superstruct_1.object)({
    version: (0, superstruct_1.literal)(1),
    sender: (0, superstruct_1.optional)((0, superstruct_1.string)()),
    expiration: exports.TransactionExpiration,
    gasConfig: GasConfig,
    inputs: (0, superstruct_1.array)(Transactions_1.TransactionBlockInput),
    transactions: (0, superstruct_1.array)(Transactions_1.TransactionType),
});
function prepareSuiAddress(address) {
    return (0, sui_types_1.normalizeSuiAddress)(address).replace('0x', '');
}
class TransactionBlockDataBuilder {
    static fromKindBytes(bytes) {
        const kind = bcs_2.builder.de('TransactionKind', bytes);
        const programmableTx = kind?.ProgrammableTransaction;
        if (!programmableTx) {
            throw new Error('Unable to deserialize from bytes.');
        }
        const serialized = (0, utils_1.create)({
            version: 1,
            // @ts-ignore
            gasConfig: {},
            inputs: programmableTx.inputs.map((value, index) => (0, utils_1.create)({
                kind: 'Input',
                value,
                index,
                type: (0, superstruct_1.is)(value, Inputs_1.PureCallArg) ? 'pure' : 'object',
            }, Transactions_1.TransactionBlockInput)),
            transactions: programmableTx.transactions,
        }, exports.SerializedTransactionDataBuilder);
        return TransactionBlockDataBuilder.restore(serialized);
    }
    static fromBytes(bytes) {
        const rawData = bcs_2.builder.de('TransactionData', bytes);
        const data = rawData?.V1;
        const programmableTx = data?.kind?.ProgrammableTransaction;
        if (!data || !programmableTx) {
            throw new Error('Unable to deserialize from bytes.');
        }
        const serialized = (0, utils_1.create)({
            version: 1,
            sender: data.sender,
            expiration: data.expiration,
            gasConfig: data.gasData,
            inputs: programmableTx.inputs.map((value, index) => (0, utils_1.create)({
                kind: 'Input',
                value,
                index,
                type: (0, superstruct_1.is)(value, Inputs_1.PureCallArg) ? 'pure' : 'object',
            }, Transactions_1.TransactionBlockInput)),
            transactions: programmableTx.transactions,
        }, exports.SerializedTransactionDataBuilder);
        // @ts-ignore
        return TransactionBlockDataBuilder.restore(serialized);
    }
    static restore(data) {
        (0, superstruct_1.assert)(data, exports.SerializedTransactionDataBuilder);
        const transactionData = new TransactionBlockDataBuilder();
        Object.assign(transactionData, data);
        return transactionData;
    }
    /**
     * Generate transaction digest.
     *
     * @param bytes BCS serialized transaction data
     * @returns transaction digest.
     */
    static getDigestFromBytes(bytes) {
        const hash = (0, hash_1.hashTypedData)('TransactionData', bytes);
        return (0, bcs_1.toB58)(hash);
    }
    constructor(clone) {
        this.version = 1;
        this.sender = clone?.sender;
        this.expiration = clone?.expiration;
        // @ts-ignore
        this.gasConfig = clone?.gasConfig ?? {};
        this.inputs = clone?.inputs ?? [];
        this.transactions = clone?.transactions ?? [];
    }
    build({ maxSizeBytes = Infinity, overrides, onlyTransactionKind, } = {}) {
        // Resolve inputs down to values:
        const inputs = this.inputs.map((input) => {
            (0, superstruct_1.assert)(input.value, Inputs_1.BuilderCallArg);
            return input.value;
        });
        const kind = {
            ProgrammableTransaction: {
                inputs,
                transactions: this.transactions,
            },
        };
        if (onlyTransactionKind) {
            return bcs_2.builder
                .ser('TransactionKind', kind, { maxSize: maxSizeBytes })
                .toBytes();
        }
        const expiration = overrides?.expiration ?? this.expiration;
        const sender = overrides?.sender ?? this.sender;
        const gasConfig = { ...this.gasConfig, ...overrides?.gasConfig };
        if (!sender) {
            throw new Error('Missing transaction sender');
        }
        if (!gasConfig.budget) {
            throw new Error('Missing gas budget');
        }
        if (!gasConfig.payment) {
            throw new Error('Missing gas payment');
        }
        if (!gasConfig.price) {
            throw new Error('Missing gas price');
        }
        const transactionData = {
            sender: prepareSuiAddress(sender),
            expiration: expiration ? expiration : { None: true },
            gasData: {
                payment: gasConfig.payment,
                owner: prepareSuiAddress(this.gasConfig.owner ?? sender),
                price: BigInt(gasConfig.price),
                budget: BigInt(gasConfig.budget),
            },
            kind: {
                ProgrammableTransaction: {
                    inputs,
                    transactions: this.transactions,
                },
            },
        };
        return bcs_2.builder
            .ser('TransactionData', { V1: transactionData }, { maxSize: maxSizeBytes })
            .toBytes();
    }
    getDigest() {
        const bytes = this.build({ onlyTransactionKind: false });
        return TransactionBlockDataBuilder.getDigestFromBytes(bytes);
    }
    snapshot() {
        // @ts-ignore
        return (0, utils_1.create)(this, exports.SerializedTransactionDataBuilder);
    }
}
exports.TransactionBlockDataBuilder = TransactionBlockDataBuilder;
//# sourceMappingURL=TransactionBlockData.js.map