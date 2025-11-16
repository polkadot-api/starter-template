import { client } from "@/client"
import { useQuery } from "@tanstack/react-query"

export const useChainSpecData = () =>
  useQuery({
    queryKey: ["chainSpecData"],
    queryFn: () => client.getChainSpecData(),
  })

export const useTokenProperties = () => {
  const { data } = useChainSpecData()

  if (!data?.properties?.tokenDecimals) return null

  return {
    decimals: data.properties.tokenDecimals,
    symbol: data.properties.tokenSymbol ?? "",
  }
}
