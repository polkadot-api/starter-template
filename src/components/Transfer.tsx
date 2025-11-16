import { subscanAddr, typedApi } from "@/client"
import { MultiAddress } from "@polkadot-api/descriptors"
import { CheckCheck, RadioTower, ShieldCheck } from "lucide-react"
import type { SS58String, TxEvent } from "polkadot-api"
import { AddressInput, SelectAccountField, useSelectedAccount } from "polkahub"
import { useState, type FC, type FormEvent } from "react"
import { TokenInput } from "./TokenInput"
import { Button } from "./ui/button"

export const Transfer = () => {
  const [to, setTo] = useState<SS58String | null>(null)
  const [amount, setAmount] = useState<bigint | null>(null)
  const [selectedAccount] = useSelectedAccount()
  const [txEvent, setTxEvt] = useState<TxEvent | null>(null)

  const transfer = (evt: FormEvent) => {
    evt.preventDefault()

    if (!to || !amount || !selectedAccount?.signer) return

    const tx = typedApi.tx.Balances.transfer_keep_alive({
      dest: MultiAddress.Id(to),
      value: amount,
    })

    tx.signSubmitAndWatch(selectedAccount.signer).subscribe({
      next: setTxEvt,
      error: (ex) => {
        console.error(ex)
        setTxEvt(null)
      },
    })
  }

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold">Transfer</h2>
      <form className="space-y-2 max-w-96 m-auto" onSubmit={transfer}>
        <SelectAccountField />
        <div>
          <label>
            To
            <AddressInput value={to} onChange={setTo} />
          </label>
        </div>
        <div>
          <label>
            Amount
            <TokenInput
              value={amount}
              onChange={setAmount}
              placeholder="Enter amount"
            />
          </label>
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={
              !to ||
              !amount ||
              !selectedAccount?.signer ||
              (!!txEvent && txEvent.type !== "finalized")
            }
          >
            Transfer
          </Button>
        </div>
        {txEvent ? <TxStatus event={txEvent} /> : null}
      </form>
    </div>
  )
}

const TxStatus: FC<{ event: TxEvent }> = ({ event }) => {
  switch (event.type) {
    case "signed":
    case "broadcasted":
      return (
        <div className="rounded border p-2">
          <div className="flex gap-2">
            <RadioTower />
            Broadcasting…
          </div>
        </div>
      )
    case "txBestBlocksState":
      return (
        <div className="rounded border p-2 space-y-2">
          <div className="flex gap-2">
            <ShieldCheck />
            Confirming…
          </div>
          {event.found ? (
            <a
              target="_blank"
              className="underline"
              href={`${subscanAddr}/extrinsic/${event.block.number}-${event.block.index}`}
            >
              Subscan Link
            </a>
          ) : null}
        </div>
      )
    case "finalized":
      return (
        <div className="rounded border p-2 space-y-2">
          <div className="flex gap-2">
            <CheckCheck />
            Finalized!
          </div>
          {
            <a
              target="_blank"
              className="underline"
              href={`${subscanAddr}/extrinsic/${event.block.number}-${event.block.index}`}
            >
              Subscan Link
            </a>
          }
        </div>
      )
  }
}
