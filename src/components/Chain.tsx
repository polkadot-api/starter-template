import { client, getActiveUrl } from "@/client"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"

export const Chain = () => {
  const { data } = useQuery({
    queryKey: ["chain"],
    queryFn: async () => {
      const [chain, nodeName, nodeVersion, activeUrl] = await Promise.all([
        client._request<string>("system_chain", []),
        client._request<string>("system_name", []),
        client._request<string>("system_version", []),
        getActiveUrl(),
      ])
      return { chain, nodeName, nodeVersion, activeUrl }
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">{data?.nodeName}</CardTitle>
        <div className="text-muted-foreground text-sm">{data?.chain}</div>
      </CardHeader>
      <CardContent>{data?.activeUrl}</CardContent>
      <CardFooter className="text-muted-foreground">
        {data ? `v${data.nodeVersion}` : null}
      </CardFooter>
    </Card>
  )
}
