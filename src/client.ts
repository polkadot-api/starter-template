import { createClient } from "polkadot-api"
import "./App.css"
import { smoldotProvider } from "./connection/smoldot"
import { websocketProvider } from "./connection/websocket"
import { dotAh } from "@polkadot-api/descriptors"

const USE_WS = window.location.search.includes("ws=true")
const WS_URL = [
  "wss://sys.ibp.network/asset-hub-polkadot",
  "wss://rpc-asset-hub-polkadot.luckyfriday.io",
  "wss://polkadot-asset-hub-rpc.polkadot.io",
  "wss://asset-hub-polkadot-rpc.dwellir.com",
]

export const client = createClient(
  USE_WS ? websocketProvider(WS_URL) : smoldotProvider(),
)
export const typedApi = client.getTypedApi(dotAh)
