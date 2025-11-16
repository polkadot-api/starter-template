import { useTokenProperties } from "@/queries/chainSpecData"
import { formatToken } from "@polkadot-api/react-components"
import type { FC } from "react"

export const TokenValue: FC<{
  value: bigint | null
}> = ({ value }) => {
  const token = useTokenProperties()
  if (!token) return null

  return value ? formatToken(value, token) : null
}
