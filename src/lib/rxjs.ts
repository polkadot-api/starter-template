import { useEffect, useState } from "react"
import type { Observable } from "rxjs"

export const useObservableValue = <T>(observable: Observable<T>) => {
  const [value, setValue] = useState<T | null>(null)

  useEffect(() => {
    const sub = observable.subscribe((v) => setValue(v))
    return () => sub.unsubscribe()
  }, [observable])

  return value
}
