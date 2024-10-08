'use client'

import { useCallback, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ISolProvider, OrbisConnectResult, OrbisDB } from "@useorbis/db-sdk"
import * as LitJsSdk from '@lit-protocol/lit-node-client'
import { toast } from '@/hooks/use-toast'
import { OrbisSolanaAuth } from '@useorbis/db-sdk/auth'

// Konstanten für Orbis-Konfiguration
const ORBIS_GATEWAY = "https://ceramic-orbisdb-mainnet-direct.hirenodes.io/"
const ORBIS_ENV = "did:pkh:solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp:8L2PuA6r6gVAWF5QCoUPMDC3com86iJTHp5VdEoAworA"
const RECEIPT_MODEL = "kjzl6hvfrbw6c7zabaqc21he40bwaohz0gd2z93vbm8uks27ghrgi1bki22op9w"
const CONTEXT = "kjzl6kcym7w8y4z8iwwh7f5678nl28ijh54k9ig8ibzj04l8n3e709gfnp1hmjh"

export const orbis = new OrbisDB({
  ceramic: {
      gateway: ORBIS_GATEWAY
  },
  nodes: [
      {
          gateway: "https://studio.useorbis.com",
          env: ORBIS_ENV
      }
  ],
})

const litNodeClient = new LitJsSdk.LitNodeClient({
  litNetwork: 'datil-dev'
})

declare global {
  interface Window {
    phantom?: {
      solana?: ISolProvider;
    };
  }
}

export async function connectOrbis(provider: ISolProvider) {
    if (!provider) {
      toast({
        title: "Solana Wallet nicht gefunden",
        description: "Bitte installieren Sie eine Solana Wallet-Erweiterung und aktualisieren Sie die Seite.",
        variant: "destructive",
      })
      return
    }
    const auth = new OrbisSolanaAuth(provider)
    const authResult: OrbisConnectResult = await orbis.connectUser({ auth })
    console.log({ authResult })
    return authResult
}

export async function selectEncryptedReceipts() {
  const select = await orbis
    .select()
    .from(RECEIPT_MODEL)
    .context(CONTEXT);

  console.log(await select.build())

  return select.run()
}

interface ReceiptData {
  controller: string;
  cipherText: string;
  dataToEncryptHash: string;
  accessControlConditions: string;
  encryptedSymmetricKey: string;
}

function formatAccessControlConditions(conditions: string): string {
  try {
    const parsedConditions = JSON.parse(conditions);
    if (Array.isArray(parsedConditions) && parsedConditions.length > 0) {
      const condition = parsedConditions[0];
      if (condition.chain === 'solana' && condition.method === 'getBalance') {
        const amount = parseInt(condition.returnValueTest.value) / 1e9; // Convert lamports to SOL
        return `User must have a Solana balance of at least ${amount} SOL`;
      }
    }
    return 'Custom access control condition';
  } catch (error) {
    console.error('Error parsing access control conditions:', error);
    return 'Invalid access control condition';
  }
}

function TruncatedCell({ content }: { content: string }) {
  const [isTruncated, setIsTruncated] = useState(false);
  const cellRef = useCallback((node: HTMLTableCellElement | null) => {
    if (node !== null) {
      setIsTruncated(node.scrollWidth > node.clientWidth);
    }
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "The cell content has been copied to your clipboard.",
      });
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <TableCell 
      ref={cellRef}
      className="truncate max-w-xs cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={copyToClipboard}
      title={content}
    >
      {content}{isTruncated ? '...' : ''}
    </TableCell>
  );
}

export default function EncryptedDataTable() {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [tableData, setTableData] = useState<ReceiptData[]>([])
  const [decryptedData, setDecryptedData] = useState<Record<string, never>>({})

  useEffect(() => {
    litNodeClient.connect()
  }, [])

  const connectWallet = async () => {
    if (typeof window.phantom?.solana === 'undefined') {
      toast({
        title: "Solana Wallet nicht gefunden",
        description: "Bitte installieren Sie eine Solana Wallet-Erweiterung und aktualisieren Sie die Seite.",
        variant: "destructive",
      })
      return
    }

    setIsConnecting(true)
    try {
      const provider = window.phantom?.solana
      await provider.connect()
      const publicKey = provider.publicKey
      if (!publicKey) throw new Error("Keine Public Key gefunden")
      await connectOrbis(provider)
      setIsConnected(true)
      fetchData()
      toast({
        title: "Verbindung hergestellt",
        description: "Ihre Wallet ist jetzt verbunden.",
      })
    } catch (error) {
      console.error("Fehler beim Verbinden:", error)
      toast({
        title: "Verbindungsfehler",
        description: "Es gab ein Problem beim Verbinden mit Ihrer Wallet. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const fetchData = async () => {
    try {
      const receipts = await selectEncryptedReceipts()
      console.log(receipts)
      setTableData(receipts.rows.map((receipt) => ({
        controller: receipt.controller,
        cipherText: receipt.ciphertext,
        dataToEncryptHash: receipt.dataToEncryptHash,
        accessControlConditions: receipt.accessControlConditions,
        encryptedSymmetricKey: receipt.encryptedSymmetricKey
      })))
    } catch (error) {
      console.error("Fehler beim Abrufen der Daten:", error)
      toast({
        title: "Datenabruf fehlgeschlagen",
        description: "Es gab ein Problem beim Abrufen der Daten. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      })
    }
  }

  const decryptData = async (index: number) => {


    const item = tableData[index]
    try{
    
      const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: "solana", nonce: await litNodeClient.getLatestBlockhash() })

      if (!authSig) {
        throw new Error("Authentifizierungssignatur konnte nicht erstellt werden.")
      }

      const decryptRequest = {
        solRpcConditions: JSON.parse(item.accessControlConditions), 
        ciphertext: item.cipherText, 
        dataToEncryptHash: item.dataToEncryptHash,
        chain: 'solana',
        authSig: authSig, 
      };


      const decrypted = JSON.parse(await LitJsSdk.decryptToString(decryptRequest, litNodeClient));

      console.log(decrypted)

      setDecryptedData({...decryptedData, [index]: decrypted})
      toast({
        title: "Entschlüsselung erfolgreich",
        description: "Die Daten wurden erfolgreich entschlüsselt.",
      })
    } catch (error) {
      console.error("Entschlüsselung fehlgeschlagen:", error)
      toast({
        title: "Entschlüsselung fehlgeschlagen",
        description: "Es gab ein Problem bei der Entschlüsselung der Daten. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      })
    }
  }

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Encrypted Data Table</h1>
        <Button onClick={connectWallet} disabled={isConnecting}>
          {isConnecting ? "Verbinde..." : "Connect Wallet"}
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Encrypted Data Table</h1>
      <div className="mb-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Controller</TableHead>
              <TableHead>Cipher Text</TableHead>
              <TableHead>Data to Encrypt Hash</TableHead>
              <TableHead>Access Control Conditions</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((item, index) => (
              <TableRow key={index}>
                <TruncatedCell content={item.controller} />
                <TruncatedCell content={item.cipherText} />
                <TruncatedCell content={item.dataToEncryptHash} />
                <TableCell>{formatAccessControlConditions(item.accessControlConditions)}</TableCell>
                <TableCell>
                  <Button onClick={() => decryptData(index)}>
                    {decryptedData[index] ? 'Decrypted' : 'Decrypt'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {Object.entries(decryptedData).map(([index, data]) => (
        <div key={index} className="mt-4">
          <h3 className="font-bold">Decrypted Data for Row {parseInt(index) + 1}:</h3>
          <pre className="bg-gray-100 p-2 rounded mt-2 overflow-x-auto">{JSON.stringify(data, null, 2)}</pre>
        </div>
      ))}
    </div>
    
  )
}