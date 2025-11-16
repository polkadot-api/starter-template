import { PolkaHubProvider } from "polkahub"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { polkaHub } from "./account.ts"
import App from "./App.tsx"
import "./index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PolkaHubProvider polkaHub={polkaHub}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </PolkaHubProvider>
  </StrictMode>,
)
