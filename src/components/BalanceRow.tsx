import { typedApi } from "@/client"
import { AccountDisplay } from "@polkadot-api/react-components"
import { useQuery } from "@tanstack/react-query"
import type { Account } from "polkahub"
import type { FC } from "react"
import { TokenValue } from "./TokenValue"
import { TableCell, TableRow } from "./ui/table"

export const BalanceRow: FC<{
  account: Account & {
    groupName: string
  }
}> = ({ account }) => {
  const { data } = useQuery({
    queryKey: ["system.account", account.address],
    queryFn: () => typedApi.query.System.Account.getValue(account.address),
  })

  return (
    <TableRow>
      <TableCell className="font-medium text-right">
        {account.name ? (
          <>
            <p>{account.name}</p>
            <p className="text-muted-foreground text-xs">{account.groupName}</p>
          </>
        ) : (
          <p className="text-muted-foreground">({account.groupName})</p>
        )}
      </TableCell>
      <TableCell>
        <AccountDisplay account={account} />
      </TableCell>
      <TableCell>
        <TokenValue value={data?.data.free ?? null} />
      </TableCell>
    </TableRow>
  )
}
