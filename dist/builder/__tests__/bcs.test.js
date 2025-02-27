"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
const bcs_1 = require("@mysten/bcs");
const vitest_1 = require("vitest");
const index_1 = require("../index");
const sui_types_1 = require("../../utils/sui-types");
// Oooh-weeee we nailed it!
(0, vitest_1.it)('can serialize simplified programmable call struct', () => {
    const moveCall = {
        kind: 'MoveCall',
        target: '0x2::display::new',
        typeArguments: ['0x6::capy::Capy'],
        arguments: [
            { kind: 'GasCoin' },
            {
                kind: 'NestedResult',
                index: 0,
                resultIndex: 1,
            },
            // @ts-ignore
            { kind: 'Input', index: 3 },
            { kind: 'Result', index: 1 },
        ],
    };
    const bytes = index_1.builder.ser(index_1.PROGRAMMABLE_CALL, moveCall).toBytes();
    const result = index_1.builder.de(index_1.PROGRAMMABLE_CALL, bytes);
    // since we normalize addresses when (de)serializing, the returned value differs
    // only check the module and the function; ignore address comparison (it's not an issue
    // with non-0x2 addresses).
    (0, vitest_1.expect)(result.arguments).toEqual(moveCall.arguments);
    (0, vitest_1.expect)(result.target.split('::').slice(1)).toEqual(moveCall.target.split('::').slice(1));
    (0, vitest_1.expect)(result.typeArguments[0].split('::').slice(1)).toEqual(moveCall.typeArguments[0].split('::').slice(1));
});
(0, vitest_1.it)('can serialize enum with "kind" property', () => {
    const transaction = {
        kind: 'TransferObjects',
        objects: [],
        // @ts-ignore
        address: { kind: 'Input', index: 0 },
    };
    const bytes = index_1.builder.ser(index_1.TRANSACTION, transaction).toBytes();
    const result = index_1.builder.de(index_1.TRANSACTION, bytes);
    (0, vitest_1.expect)(result).toEqual(transaction);
});
function ref() {
    return {
        objectId: (Math.random() * 100000).toFixed(0).padEnd(64, '0'),
        version: String((Math.random() * 10000).toFixed(0)),
        digest: (0, bcs_1.toB58)(new Uint8Array([
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        ])),
    };
}
(0, vitest_1.it)('can serialize transaction data with a programmable transaction', () => {
    let sui = (0, sui_types_1.normalizeSuiAddress)('0x2').replace('0x', '');
    let txData = {
        V1: {
            sender: (0, sui_types_1.normalizeSuiAddress)('0xBAD').replace('0x', ''),
            expiration: { None: true },
            gasData: {
                payment: [ref()],
                owner: sui,
                price: '1',
                budget: '1000000',
            },
            kind: {
                ProgrammableTransaction: {
                    inputs: [
                        // first argument is the publisher object
                        { Object: { ImmOrOwned: ref() } },
                        // second argument is a vector of names
                        {
                            Pure: Array.from(index_1.builder
                                .ser('vector<string>', ['name', 'description', 'img_url'])
                                .toBytes()),
                        },
                        // third argument is a vector of values
                        {
                            Pure: Array.from(index_1.builder
                                .ser('vector<string>', [
                                'Capy {name}',
                                'A cute little creature',
                                'https://api.capy.art/{id}/svg',
                            ])
                                .toBytes()),
                        },
                        // 4th and last argument is the account address to send display to
                        {
                            Pure: Array.from(index_1.builder.ser('address', ref().objectId).toBytes()),
                        },
                    ],
                    transactions: [
                        {
                            kind: 'MoveCall',
                            target: `${sui}::display::new`,
                            typeArguments: [`${sui}::capy::Capy`],
                            arguments: [
                                // publisher object
                                { kind: 'Input', index: 0 },
                            ],
                        },
                        {
                            kind: 'MoveCall',
                            target: `${sui}::display::add_multiple`,
                            typeArguments: [`${sui}::capy::Capy`],
                            arguments: [
                                // result of the first transaction
                                { kind: 'Result', index: 0 },
                                // second argument - vector of names
                                { kind: 'Input', index: 1 },
                                // third argument - vector of values
                                { kind: 'Input', index: 2 },
                            ],
                        },
                        {
                            kind: 'MoveCall',
                            target: `${sui}::display::update_version`,
                            typeArguments: [`${sui}::capy::Capy`],
                            arguments: [
                                // result of the first transaction again
                                { kind: 'Result', index: 0 },
                            ],
                        },
                        {
                            kind: 'TransferObjects',
                            objects: [
                                // the display object
                                { kind: 'Result', index: 0 },
                            ],
                            // address is also an input
                            address: { kind: 'Input', index: 3 },
                        },
                    ],
                },
            },
        },
    };
    const type = 'TransactionData';
    const bytes = index_1.builder.ser(type, txData).toBytes();
    const result = index_1.builder.de(type, bytes);
    (0, vitest_1.expect)(result).toEqual(txData);
});
//# sourceMappingURL=bcs.test.js.map