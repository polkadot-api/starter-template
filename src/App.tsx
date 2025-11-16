import { ManagePjsWallets, ManageVault, PolkaHubModal } from "polkahub"

function App() {
  return (
    <div>
      <div className="container p-2 flex justify-between">
        <div></div>
        <PolkaHubModal>
          <ManagePjsWallets />
          <ManageVault />
        </PolkaHubModal>
      </div>
    </div>
  )
}

export default App
