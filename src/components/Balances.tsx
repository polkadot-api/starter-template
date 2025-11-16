import { Wallet } from "lucide-react"
import { openSelectAccount, useAvailableAccounts } from "polkahub"
import { BalanceRow } from "./BalanceRow"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table"

export const Balances = () => (
  <div>
    <h2 className="text-2xl font-bold">Balances</h2>
    <BalancesTable />
  </div>
)

const BalancesTable = () => {
  const accountGroups = useAvailableAccounts()
  // PolkaHub groups accounts by provider. We just want a flat list instead.
  const accounts = Object.entries(accountGroups).flatMap(([groupName, group]) =>
    group.map((account) => ({ ...account, groupName })),
  )

  if (!accounts.length) {
    return (
      <Card className="bg-muted text-muted-foreground text-center">
        <CardContent className="space-y-4">
          <p>No accounts available</p>
          <div className="flex gap-2 items-center justify-center">
            <Wallet />
            Connect with a wallet to see the list of accounts
          </div>
          <Button onClick={openSelectAccount}>Connect Accounts</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">Name</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Balance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {accounts.map((account, i) => (
          <BalanceRow key={i} account={account} />
        ))}
      </TableBody>
    </Table>
  )
}
