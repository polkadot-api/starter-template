import { withPolkadotSdkCompat } from "polkadot-api/polkadot-sdk-compat"
import { getWsProvider, WsEvent } from "polkadot-api/ws-provider"

export const websocketProvider = (url: string[]) => {
  // In general, you can just do `getWsProvider(url)`
  // But this utility also returns a promise to get the URL that the provider
  // picked out of the full list.

  let resolveConnectedUrl: (url: string) => void = () => {}
  const connectedUrl = new Promise<string>((resolve) => {
    resolveConnectedUrl = resolve
  })

  const provider = getWsProvider(url, {
    onStatusChanged(status) {
      if (status.type === WsEvent.CONNECTED) {
        resolveConnectedUrl(status.uri)
      }
    },
  })

  return {
    provider: withPolkadotSdkCompat(provider),
    connectedUrl,
  }
}
