<h1 align="center"><img alt="🥚" src="https://i.ibb.co/4ZLv0Xj/genesis-logo.png" width="auto" height="26px" style="border-radius:2px;margin-bottom:-6px;"/>&nbsp;Genesis</h1>

> Fractional & tokenized IP investing on Solana

👉 See the mock demo here: [demo link](https://genesis-app-web.vercel.app/invest)

## Setup

First, make sure your node version matches the one specified in `.nvmrc`

Install dependencies and copy the `.env.example` content into `.env`:

```bash
yarn install & cp .env.example .env.local
```

Then start the app:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## .env

- **`NEXT_PUBLIC_SOLANA_CLUSTER`** can be either `mainnet-beta`, `testnet` or `devnet`. Rule of thumb is to use `devnet` on localhost development, and `mainnet-beta` for production applications
- **`NEXT_PUBLIC_SOLANA_RPC_NODE_ENDPOINT`** is necessary for application to be able to execute any blockchain-specific actions.
