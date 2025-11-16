import { chainSpec as dotChainSpec } from "polkadot-api/chains/polkadot"
import { chainSpec as dotAhChainSpec } from "polkadot-api/chains/polkadot_asset_hub"
import { getSmProvider } from "polkadot-api/sm-provider"
import { startFromWorker } from "polkadot-api/smoldot/from-worker"
import SmWorker from "polkadot-api/smoldot/worker?worker"

const smoldot = startFromWorker(new SmWorker())
const dotChain = smoldot.addChain({
  chainSpec: dotChainSpec,
})
const dotAhChain = dotChain.then((relayChain) =>
  smoldot.addChain({
    chainSpec: dotAhChainSpec,
    potentialRelayChains: [relayChain],
  }),
)

export const smoldotProvider = () => getSmProvider(dotAhChain)
