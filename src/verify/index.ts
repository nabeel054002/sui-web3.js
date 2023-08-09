// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type {
  PublicKey,
  SerializedSignature,
  SignatureScheme,
} from '../cryptography/index';
import { parseSerializedSignature } from '../cryptography/index';
import { Ed25519PublicKey } from '../keypairs/ed25519/publickey';
import { Secp256k1PublicKey } from '../keypairs/secp256k1/publickey';
import { Secp256r1PublicKey } from '../keypairs/secp256r1/publickey';
// eslint-disable-next-line import/no-cycle
import { MultiSigPublicKey } from '../multisig/publickey';

export async function verifySignature(
  bytes: Uint8Array,
  signature: SerializedSignature,
): Promise<PublicKey> {
  const parsedSignature = parseSignature(signature);

  if (
    !(await parsedSignature.publicKey.verify(
      bytes,
      parsedSignature.serializedSignature,
    ))
  ) {
    throw new Error(`Signature is not valid for the provided data`);
  }

  return parsedSignature.publicKey;
}

export async function verifyPersonalMessage(
  message: Uint8Array,
  signature: SerializedSignature,
): Promise<PublicKey> {
  const parsedSignature = parseSignature(signature);

  if (
    !(await parsedSignature.publicKey.verifyPersonalMessage(
      message,
      parsedSignature.serializedSignature,
    ))
  ) {
    throw new Error(`Signature is not valid for the provided message`);
  }

  return parsedSignature.publicKey;
}

export async function verifyTransactionBlock(
  transactionBlock: Uint8Array,
  signature: SerializedSignature,
): Promise<PublicKey> {
  const parsedSignature = parseSignature(signature);

  if (
    !(await parsedSignature.publicKey.verifyTransactionBlock(
      transactionBlock,
      parsedSignature.serializedSignature,
    ))
  ) {
    throw new Error(`Signature is not valid for the provided TransactionBlock`);
  }

  return parsedSignature.publicKey;
}

function parseSignature(signature: SerializedSignature) {
  const parsedSignature = parseSerializedSignature(signature);

  if (parsedSignature.signatureScheme === 'MultiSig') {
    return {
      ...parsedSignature,
      publicKey: new MultiSigPublicKey(parsedSignature.multisig.multisig_pk),
    };
  }

  const publicKey = publicKeyFromRawBytes(
    parsedSignature.signatureScheme,
    parsedSignature.publicKey,
  );
  return {
    ...parsedSignature,
    publicKey,
  };
}

export function publicKeyFromRawBytes(
  signatureScheme: SignatureScheme,
  bytes: Uint8Array,
): PublicKey {
  switch (signatureScheme) {
    case 'ED25519':
      return new Ed25519PublicKey(bytes);
    case 'Secp256k1':
      return new Secp256k1PublicKey(bytes);
    case 'Secp256r1':
      return new Secp256r1PublicKey(bytes);
    case 'MultiSig':
      return new MultiSigPublicKey(bytes);
    default:
      throw new Error(`Unsupported signature scheme ${signatureScheme}`);
  }
}
