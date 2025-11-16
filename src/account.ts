import {
  createPjsWalletProvider,
  createPolkadotVaultProvider,
  createPolkaHub,
  createSelectedAccountPlugin,
} from "polkahub"

export const polkaHub = createPolkaHub([
  createSelectedAccountPlugin(),
  createPjsWalletProvider(),
  createPolkadotVaultProvider(),
])
