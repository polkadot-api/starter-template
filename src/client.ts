import { dotAh } from "@polkadot-api/descriptors"
import { createClient } from "polkadot-api"
import { smoldotProvider } from "./connection/smoldot"
import { websocketProvider } from "./connection/websocket"

const USE_WS = window.location.search.includes("ws=true")
const WS_URL = [
  "wss://sys.ibp.network/asset-hub-polkadot",
  "wss://rpc-asset-hub-polkadot.luckyfriday.io",
  "wss://polkadot-asset-hub-rpc.polkadot.io",
  "wss://asset-hub-polkadot-rpc.dwellir.com",
]

const { provider: wsProvider, connectedUrl } = websocketProvider(WS_URL)

export const client = createClient(USE_WS ? wsProvider : smoldotProvider())
export const typedApi = client.getTypedApi(dotAh)

export const getActiveUrl = async () => {
  if (USE_WS) return connectedUrl
  return "Light client"
}

export const subscanAddr = "https://polkadot.subscan.io"
