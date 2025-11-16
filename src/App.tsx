import { ManagePjsWallets, ManageVault, PolkaHubModal } from "polkahub"
import { Balances } from "./components/Balances"
import { BlockNumber } from "./components/BlockNumber"
import { Chain } from "./components/Chain"
import { Transfer } from "./components/Transfer"

function App() {
  return (
    <div>
      <div className="container m-auto p-2 flex justify-between">
        <div></div>
        <PolkaHubModal>
          <ManagePjsWallets />
          <div className="flex justify-center">
            <ManageVault />
          </div>
        </PolkaHubModal>
      </div>
      <div className="container m-auto p-2 space-y-4">
        <div className="flex gap-2 justify-stretch">
          <Chain />
          <BlockNumber type="finalized" />
          <BlockNumber type="best" />
        </div>
        <Balances />
        <Transfer />
      </div>
    </div>
  )
}

export default App
