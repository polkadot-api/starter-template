import { withPolkadotSdkCompat } from "polkadot-api/polkadot-sdk-compat"
import { getWsProvider } from "polkadot-api/ws-provider"

export const websocketProvider = (url: string[]) =>
  withPolkadotSdkCompat(getWsProvider(url))
