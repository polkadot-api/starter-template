import { dotAh, pasAh } from "@polkadot-api/descriptors"
import { createClient } from "polkadot-api"
import { smoldotProvider } from "./connection/smoldot"
import { websocketProvider } from "./connection/websocket"
import { withLogsRecorder } from "polkadot-api/logs-provider"

export const USE_WS = window.location.search.includes("ws=true")
export const PASEO = window.location.search.includes("chain=pas")

const WS_URL = PASEO
  ? [
      "wss://sys.ibp.network/asset-hub-paseo",
      "wss://asset-hub-paseo-rpc.dwellir.com",
      "wss://pas-rpc.stakeworld.io/assethub",
    ]
  : [
      "wss://sys.ibp.network/asset-hub-polkadot",
      "wss://rpc-asset-hub-polkadot.luckyfriday.io",
      "wss://polkadot-asset-hub-rpc.polkadot.io",
      "wss://asset-hub-polkadot-rpc.dwellir.com",
    ]

const { provider: wsProvider, connectedUrl } = websocketProvider(WS_URL)

export const client = createClient(
  withLogsRecorder(
    console.log,
    USE_WS ? wsProvider : smoldotProvider(PASEO ? "paseo" : "polkadot"),
  ),
)
export const typedApi = client.getTypedApi(PASEO ? pasAh : dotAh)

export const getActiveUrl = async () => {
  if (USE_WS) return connectedUrl
  return "Light client"
}

export const subscanAddr = PASEO
  ? "https://assethub-paseo.subscan.io"
  : "https://assethub-polkadot.subscan.io"
