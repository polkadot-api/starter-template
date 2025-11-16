import { chainSpec as pasChainSpec } from "polkadot-api/chains/paseo"
import { chainSpec as pasAhChainSpec } from "polkadot-api/chains/paseo_asset_hub"
import { chainSpec as dotChainSpec } from "polkadot-api/chains/polkadot"
import { chainSpec as dotAhChainSpec } from "polkadot-api/chains/polkadot_asset_hub"
import { getSmProvider } from "polkadot-api/sm-provider"
import { startFromWorker } from "polkadot-api/smoldot/from-worker"
import SmWorker from "polkadot-api/smoldot/worker?worker"

const smoldot = startFromWorker(new SmWorker())

export const smoldotProvider = (chain: "polkadot" | "paseo") => {
  if (chain === "polkadot") {
    const dotChain = smoldot.addChain({
      chainSpec: dotChainSpec,
    })
    const dotAhChain = dotChain.then((relayChain) =>
      smoldot.addChain({
        chainSpec: dotAhChainSpec,
        potentialRelayChains: [relayChain],
      }),
    )

    return getSmProvider(dotAhChain)
  }

  const pasChain = smoldot.addChain({
    chainSpec: pasChainSpec,
  })
  const pasAhChain = pasChain.then((relayChain) =>
    smoldot.addChain({
      chainSpec: pasAhChainSpec,
      potentialRelayChains: [relayChain],
    }),
  )

  return getSmProvider(pasAhChain)
}
