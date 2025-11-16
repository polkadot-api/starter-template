import { PASEO, USE_WS } from "@/client"
import { cn } from "@/lib/utils"
import { ManagePjsWallets, ManageVault, PolkaHubModal } from "polkahub"

export const Header = () => (
  <div className="container m-auto p-2 flex justify-between">
    <Chain />
    <PolkaHubModal>
      <ManagePjsWallets />
      <div className="flex justify-center">
        <ManageVault />
      </div>
    </PolkaHubModal>
  </div>
)

export const Chain = () => {
  const chain = PASEO ? "paseo" : "polkadot"

  return (
    <div className="flex items-center gap-4">
      <div>
        <a
          className={cn({
            "font-bold": !PASEO,
          })}
          href={`${import.meta.env.BASE_URL}?chain=polkadot&ws=${USE_WS}`}
        >
          Polkadot
        </a>{" "}
        /{" "}
        <a
          className={cn({
            "font-bold": PASEO,
          })}
          href={`${import.meta.env.BASE_URL}?chain=paseo&ws=${USE_WS}`}
        >
          Paseo
        </a>
      </div>
      <div>
        <a
          className={cn({
            "font-bold": !USE_WS,
          })}
          href={`${import.meta.env.BASE_URL}?chain=${chain}&ws=false`}
        >
          Smoldot
        </a>{" "}
        /{" "}
        <a
          className={cn({
            "font-bold": USE_WS,
          })}
          href={`${import.meta.env.BASE_URL}?chain=${chain}&ws=true`}
        >
          WS
        </a>
      </div>
    </div>
  )
}
