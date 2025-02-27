import { formatAddress, formatDigest } from './format';
import { isValidSuiAddress, isValidSuiObjectId, isValidTransactionDigest, normalizeStructTag, normalizeSuiAddress, normalizeSuiObjectId, parseStructTag, SUI_ADDRESS_LENGTH } from './sui-types';
export { fromB64, toB64 } from '@mysten/bcs';
export { is, assert } from 'superstruct';
export { formatAddress, formatDigest, isValidSuiAddress, isValidSuiObjectId, isValidTransactionDigest, normalizeStructTag, normalizeSuiAddress, normalizeSuiObjectId, parseStructTag, SUI_ADDRESS_LENGTH, };
export declare const SUI_DECIMALS = 9;
export declare const MIST_PER_SUI: bigint;
export declare const MOVE_STDLIB_ADDRESS = "0x1";
export declare const SUI_FRAMEWORK_ADDRESS = "0x2";
export declare const SUI_SYSTEM_ADDRESS = "0x3";
export declare const SUI_CLOCK_OBJECT_ID: string;
export declare const SUI_SYSTEM_MODULE_NAME = "sui_system";
export declare const SUI_TYPE_ARG: string;
export declare const SUI_SYSTEM_STATE_OBJECT_ID: string;
//# sourceMappingURL=index.d.ts.map