"use strict";
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullnodeUrl = void 0;
function getFullnodeUrl(network) {
    switch (network) {
        case 'mainnet':
            return 'https://fullnode.mainnet.sui.io:443';
        case 'testnet':
            return 'https://fullnode.testnet.sui.io:443';
        case 'devnet':
            return 'https://fullnode.devnet.sui.io:443';
        case 'localnet':
            return 'http://127.0.0.1:9000';
        default:
            throw new Error(`Unknown network: ${network}`);
    }
}
exports.getFullnodeUrl = getFullnodeUrl;
//# sourceMappingURL=network.js.map