"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ed25519Keypair = exports.DEFAULT_ED25519_DERIVATION_PATH = void 0;
const tweetnacl_1 = __importDefault(require("tweetnacl"));
const publickey_1 = require("./publickey");
const mnemonics_1 = require("../../cryptography/mnemonics");
const ed25519_hd_key_1 = require("./ed25519-hd-key");
const bcs_1 = require("@mysten/bcs");
const keypair_1 = require("../../cryptography/keypair");
exports.DEFAULT_ED25519_DERIVATION_PATH = "m/44'/784'/0'/0'/0'";
/**
 * An Ed25519 Keypair used for signing transactions.
 */
class Ed25519Keypair extends keypair_1.Keypair {
    /**
     * Create a new Ed25519 keypair instance.
     * Generate random keypair if no {@link Ed25519Keypair} is provided.
     *
     * @param keypair Ed25519 keypair
     */
    constructor(keypair, _mpc = false, _email = null) {
        super();
        this.mpc = false;
        this.email = '';
        this.mpc = _mpc;
        if (this.mpc) {
            this.keypair = keypair;
            this.email = _email;
        }
        else if (keypair) {
            this.keypair = keypair;
        }
        else {
            this.keypair = tweetnacl_1.default.sign.keyPair();
        }
    }
    /**
     * Get the key scheme of the keypair ED25519
     */
    getKeyScheme() {
        return 'ED25519';
    }
    /**
     * Generate a new random Ed25519 keypair
     */
    static generate() {
        return new Ed25519Keypair(tweetnacl_1.default.sign.keyPair());
    }
    /**
     * Create a Ed25519 keypair from a raw secret key byte array, also known as seed.
     * This is NOT the private scalar which is result of hashing and bit clamping of
     * the raw secret key.
     *
     * The sui.keystore key is a list of Base64 encoded `flag || privkey`. To import
     * a key from sui.keystore to typescript, decode from base64 and remove the first
     * flag byte after checking it is indeed the Ed25519 scheme flag 0x00 (See more
     * on flag for signature scheme: https://github.com/MystenLabs/sui/blob/818406c5abdf7de1b80915a0519071eec3a5b1c7/crates/sui-types/src/crypto.rs#L1650):
     * ```
     * import { Ed25519Keypair, fromB64 } from '@mysten/sui';
     * const raw = fromB64(t[1]);
     * if (raw[0] !== 0 || raw.length !== PRIVATE_KEY_SIZE + 1) {
     *   throw new Error('invalid key');
     * }
     * const imported = Ed25519Keypair.fromSecretKey(raw.slice(1))
     * ```
     * @throws error if the provided secret key is invalid and validation is not skipped.
     *
     * @param secretKey secret key byte array
     * @param options: skip secret key validation
     */
    static fromSecretKey(secretKey, options) {
        const secretKeyLength = secretKey.length;
        if (secretKeyLength !== keypair_1.PRIVATE_KEY_SIZE) {
            throw new Error(`Wrong secretKey size. Expected ${keypair_1.PRIVATE_KEY_SIZE} bytes, got ${secretKeyLength}.`);
        }
        const keypair = tweetnacl_1.default.sign.keyPair.fromSeed(secretKey);
        if (!options || !options.skipValidation) {
            const encoder = new TextEncoder();
            const signData = encoder.encode('sui validation');
            const signature = tweetnacl_1.default.sign.detached(signData, keypair.secretKey);
            if (!tweetnacl_1.default.sign.detached.verify(signData, signature, keypair.publicKey)) {
                throw new Error('provided secretKey is invalid');
            }
        }
        return new Ed25519Keypair(keypair);
    }
    /**
     * The public key for this Ed25519 keypair
     */
    getPublicKey() {
        return new publickey_1.Ed25519PublicKey(this.keypair.publicKey);
    }
    async sign(data) {
        return this.signData(data);
    }
    /**
     * Return the signature for the provided data using Ed25519.
     */
    signData(data) {
        return tweetnacl_1.default.sign.detached(data, this.keypair.secretKey);
    }
    /**
     * Return the signature for the provided data using Ed25519.
     */
    signBuffer(data) {
        return tweetnacl_1.default.sign.detached(data, this.keypair.secretKey);
    }
    /**
     * Generate an Ed25519 keypair from a 32 byte seed.
     *
     * @param seed seed byte array
     */
    static fromSeed(seed) {
        const seedLength = seed.length;
        if (seedLength != 32) {
            throw new Error(`Wrong seed size. Expected 32 bytes, got ${seedLength}.`);
        }
        return new Ed25519Keypair(tweetnacl_1.default.sign.keyPair.fromSeed(seed));
    }
    /**
     * Derive Ed25519 keypair from mnemonics and path. The mnemonics must be normalized
     * and validated against the english wordlist.
     *
     * If path is none, it will default to m/44'/784'/0'/0'/0', otherwise the path must
     * be compliant to SLIP-0010 in form m/44'/784'/{account_index}'/{change_index}'/{address_index}'.
     */
    static deriveKeypair(mnemonics, path) {
        if (path == null) {
            path = exports.DEFAULT_ED25519_DERIVATION_PATH;
        }
        if (!(0, mnemonics_1.isValidHardenedPath)(path)) {
            throw new Error('Invalid derivation path');
        }
        const { key } = (0, ed25519_hd_key_1.derivePath)(path, (0, mnemonics_1.mnemonicToSeedHex)(mnemonics));
        return Ed25519Keypair.fromSecretKey(key);
    }
    /**
     * Derive Ed25519 keypair from mnemonicSeed and path.
     *
     * If path is none, it will default to m/44'/784'/0'/0'/0', otherwise the path must
     * be compliant to SLIP-0010 in form m/44'/784'/{account_index}'/{change_index}'/{address_index}'.
     */
    static deriveKeypairFromSeed(seedHex, path) {
        if (path == null) {
            path = exports.DEFAULT_ED25519_DERIVATION_PATH;
        }
        if (!(0, mnemonics_1.isValidHardenedPath)(path)) {
            throw new Error('Invalid derivation path');
        }
        const { key } = (0, ed25519_hd_key_1.derivePath)(path, seedHex);
        return Ed25519Keypair.fromSecretKey(key);
    }
    /**
     * Derives account address, public key and private key
     * @returns publicKey, address and privateKey
     */
    toPrivateKeyObject() {
        const publicKeyHex = Buffer.from(this.getPublicKey().toBytes()).toString('hex');
        const privateKeyHex = Buffer.from(this.keypair.secretKey.slice(0, 32)).toString('hex');
        const address = this.getPublicKey().toSuiAddress();
        return {
            address: address.startsWith('0x') ? address : '0x' + address,
            publicKeyHex: publicKeyHex.startsWith('0x')
                ? publicKeyHex
                : '0x' + publicKeyHex,
            privateKeyHex: privateKeyHex.startsWith('0x')
                ? privateKeyHex
                : '0x' + privateKeyHex,
        };
    }
    /**
     * This returns an exported keypair object, the private key field is the pure 32-byte seed.
     */
    export() {
        return {
            schema: 'ED25519',
            privateKey: (0, bcs_1.toB64)(this.keypair.secretKey.slice(0, keypair_1.PRIVATE_KEY_SIZE)),
        };
    }
}
exports.Ed25519Keypair = Ed25519Keypair;
//# sourceMappingURL=keypair.js.map