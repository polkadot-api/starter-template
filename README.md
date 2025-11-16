# PAPI Starter Template

This is a simple application built with PAPI to quickly get started.

It features:

- Loading chain information
- Integrating with wallets with PolkaHub
- Sending a transfer
- Multi-chain (Polkadot and Paseo)

It's not meant as "the official" template, but rather as a quick example to get something running.

## Getting Started

Fork the repository, then run it with:

```sh
pnpm i
pnpm dev
```

## Structure

It's based on a simple Vite + React + React Query + Shadcn/ui project:

- `App.tsx`

  Holds the general layout of the application

- `client.ts`

  Sets up the connection to the chain with the PAPI client

- `account.ts`

  Sets up wallet integration with polkahub

- `connection`

  Sets up the connection configuration for the two possible providers: smoldot and websocket.

- `components`

  Holds each of the different components used throughout the app: Balances, Transfer, Chain information, Block number, etc.

- `lib`

  General-use utilities

- `queries`

  React queries shared between multiple components

## Further reading

[Polkadot-API Docs](https://papi.how/)
