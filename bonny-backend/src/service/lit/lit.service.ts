import { Injectable } from '@nestjs/common';
import * as LitJsSdk from "@lit-protocol/lit-node-client-nodejs";
import { LitNetwork } from '@lit-protocol/constants'
import { SolRpcConditions } from "@lit-protocol/types"
import { Receipt } from 'src/db/schema';
import { EncryptionMetadata } from 'src/db/schema/lit';

@Injectable()
export class LitService {
    //@ts-ignore
    litNodeClient: LitJsSdk.LitNodeClientNodeJs;
    chain = "solana"

    constructor(){
      this.litNodeClient = new LitJsSdk.LitNodeClientNodeJs({
        litNetwork: LitNetwork.DatilDev
      });
      this.connect()
    }

    async connect() {
      await this.litNodeClient.connect();
    }

    async disconnect() {
    await this.litNodeClient.disconnect()
    }

    async encryptReceipt(receipt: Receipt): Promise<EncryptionMetadata> {
    try {
      const { ciphertext, dataToEncryptHash } = await LitJsSdk.encryptString(
        {
          solRpcConditions: STANDARD_ACCESS_RIGHTS,
          dataToEncrypt: JSON.stringify(receipt),
        },
        this.litNodeClient,
      );

      const encryptionMetadata: EncryptionMetadata = {
        ciphertext: ciphertext,
        dataToEncryptHash: dataToEncryptHash,
        accessControlConditions: STANDARD_ACCESS_RIGHTS
      }

      return encryptionMetadata

    } catch(e) {
      console.log(e)
      return {ciphertext: "", dataToEncryptHash: "", accessControlConditions: STANDARD_ACCESS_RIGHTS}
    }
  }

  personalAccessRights(userPubkey: string) {
    const access_rights: SolRpcConditions = [
      {
        method: "getBalance(getPDA)",
        params: [],
        pdaParams: [
          process.env.PROGRAM_ID,
          "access",
          userPubkey,
          ":userAddress",
        ],
        pdaInterface: { offset: 8, fields: { owner_wallet: 32 } },
        pdaKey: "owner_wallet",
        chain: "solana",
        returnValueTest: {
          key: "",
          comparator: ">=",
          value: "100000000", // equals 0.1 SOL
        },
      },
    ];
  }


}


const STANDARD_ACCESS_RIGHTS: SolRpcConditions = [
  {
    method: "getBalance",
    params: [":userAddress"],
    pdaParams: [],
    pdaInterface: { offset: 0, fields: {} },
    pdaKey: "",
    chain: "solana",
    returnValueTest: {
      key: "",
      comparator: ">=",
      value: "100000000", // equals 0.1 SOL
    },
  },
];


