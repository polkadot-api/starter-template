import { client } from "@/client"
import { useObservableValue } from "@/lib/rxjs"
import { useMemo, type FC } from "react"
import { map } from "rxjs"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export const BlockNumber: FC<{
  type: "finalized" | "best"
}> = ({ type }) => {
  const blockInfo = useObservableValue(
    useMemo(
      () =>
        type === "finalized"
          ? client.finalizedBlock$
          : client.bestBlocks$.pipe(map((blocks) => blocks[0])),
      [type],
    ),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">
          {type === "finalized" ? "Finalised Block" : "Best Block"}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-2xl font-bold">
        {blockInfo?.number.toLocaleString()}
      </CardContent>
    </Card>
  )
}
