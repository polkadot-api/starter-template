import { cn } from "@/lib/utils"
import { useTokenProperties } from "@/queries/chainSpecData"
import { useTokenInput } from "@polkadot-api/react-components"
import { type FC } from "react"
import { Input } from "./ui/input"

export const TokenInput: FC<
  {
    value?: bigint | null
    onChange?: (value: bigint | null) => void
  } & Omit<React.ComponentProps<"input">, "value" | "onChange">
> = ({ value, onChange, ...props }) => {
  const token = useTokenProperties()
  const inputProps = useTokenInput(token, value, onChange)
  const symbol = token?.symbol

  const inputElement = (
    <Input
      {...props}
      className={cn(
        symbol ? "pr-10 after:content-[attr(data-foo)]" : "",
        props.className,
      )}
      data-foo={symbol}
      type="text"
      {...inputProps}
    />
  )

  return symbol ? (
    <div className={cn("relative", props.className)}>
      {inputElement}
      <div className="text-sm text-muted-foreground absolute right-2 top-1/2 -translate-y-1/2">
        {symbol}
      </div>
    </div>
  ) : (
    inputElement
  )
}
