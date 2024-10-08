import EncryptedDataTable from '@/components/EncryptedDataTable'

export default function Home() {
  return (
    <main className="flex max-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Encrypted Data Table</h1>
      <EncryptedDataTable />
    </main>
  )
}