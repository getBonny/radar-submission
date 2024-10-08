import { Connection } from "@metaplex/js";
import { Keypair, PublicKey } from "@solana/web3.js";

import * as _ from 'lodash'
import * as mp from '@metaplex-foundation/js'
import { keypairIdentity, } from "@metaplex-foundation/js";
const connection = new Connection(process.env.RPC_URL_PROD, "confirmed");
var metaplex: mp.Metaplex;
var dbClient: any

const COLLECTION_PUBKEY = "wnuwNcRuk9qDLef2jWf1Xn5kWJXsjjJVmL5hMTPWSTR";


export function initMetaplex() {
    let seed = Uint8Array.from(JSON.parse(String(process.env.KEYPAIR)))
    let keypair = Keypair.fromSecretKey(seed)

    metaplex = mp.Metaplex.make(connection)
    .use(keypairIdentity(keypair))
}

export async function loadNftsByOwner(publicKey: PublicKey) {
    
    const nfts = (await metaplex
    .nfts()
    .findAllByOwner({owner: publicKey}))
    .filter(nft => nft.collection.address.toString() == COLLECTION_PUBKEY)
    return nfts;
}