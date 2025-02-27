import type { ExportedKeypair } from '../../cryptography/keypair';
import { Ed25519PublicKey } from './publickey';
import type { SignatureScheme } from '../../cryptography/signature';
import { Keypair } from '../../cryptography/keypair';
export declare const DEFAULT_ED25519_DERIVATION_PATH = "m/44'/784'/0'/0'/0'";
/**
 * Ed25519 Keypair data. The publickey is the 32-byte public key and
 * the secretkey is 64-byte, where the first 32 bytes is the secret
 * key and the last 32 bytes is the public key.
 */
export interface Ed25519KeypairData {
    publicKey: Uint8Array;
    secretKey: Uint8Array;
}
/**
 * An Ed25519 Keypair used for signing transactions.
 */
export declare class Ed25519Keypair extends Keypair {
    private keypair;
    mpc: boolean;
    email: string;
    /**
     * Create a new Ed25519 keypair instance.
     * Generate random keypair if no {@link Ed25519Keypair} is provided.
     *
     * @param keypair Ed25519 keypair
     */
    constructor(keypair?: Ed25519KeypairData, _mpc?: boolean, _email?: any);
    /**
     * Get the key scheme of the keypair ED25519
     */
    getKeyScheme(): SignatureScheme;
    /**
     * Generate a new random Ed25519 keypair
     */
    static generate(): Ed25519Keypair;
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
    static fromSecretKey(secretKey: Uint8Array, options?: {
        skipValidation?: boolean;
    }): Ed25519Keypair;
    /**
     * The public key for this Ed25519 keypair
     */
    getPublicKey(): Ed25519PublicKey;
    sign(data: Uint8Array): Promise<Uint8Array>;
    /**
     * Return the signature for the provided data using Ed25519.
     */
    signData(data: Uint8Array): Uint8Array;
    /**
     * Return the signature for the provided data using Ed25519.
     */
    signBuffer(data: Uint8Array): Uint8Array;
    /**
     * Generate an Ed25519 keypair from a 32 byte seed.
     *
     * @param seed seed byte array
     */
    static fromSeed(seed: Uint8Array): Ed25519Keypair;
    /**
     * Derive Ed25519 keypair from mnemonics and path. The mnemonics must be normalized
     * and validated against the english wordlist.
     *
     * If path is none, it will default to m/44'/784'/0'/0'/0', otherwise the path must
     * be compliant to SLIP-0010 in form m/44'/784'/{account_index}'/{change_index}'/{address_index}'.
     */
    static deriveKeypair(mnemonics: string, path?: string): Ed25519Keypair;
    /**
     * Derive Ed25519 keypair from mnemonicSeed and path.
     *
     * If path is none, it will default to m/44'/784'/0'/0'/0', otherwise the path must
     * be compliant to SLIP-0010 in form m/44'/784'/{account_index}'/{change_index}'/{address_index}'.
     */
    static deriveKeypairFromSeed(seedHex: string, path?: string): Ed25519Keypair;
    /**
     * Derives account address, public key and private key
     * @returns publicKey, address and privateKey
     */
    toPrivateKeyObject(): object;
    /**
     * This returns an exported keypair object, the private key field is the pure 32-byte seed.
     */
    export(): ExportedKeypair;
}
//# sourceMappingURL=keypair.d.ts.map