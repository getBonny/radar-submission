import { SolRpcConditions } from "@lit-protocol/types"

export type EncryptionMetadata = {
    ciphertext: string,
    dataToEncryptHash: string
    accessControlConditions: SolRpcConditions
  }