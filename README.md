# Guestbook App

This is a simple guestbook app built with Vite that allows users to add new entries and display them on the screen. The app uses the `@web3modal/react` package to connect to a wallet and `wagmi` to interact with a smart contract. The smart contract has been deployed to the [Goerli network](https://goerli.etherscan.io/address/0x61912362d631f0e09e2e0e7934f725097becc05b).

## Getting Started

To run the app locally, first clone the repository and navigate to the project directory. Then install the dependencies and run the dapp locally.

```
yarn add
yarn dev
```

This should launch the app in your browser, if it doesn't, go to `http://127.0.0.1:5173/`.

```
touch .env
```

Add `VITE_PROJECT_ID=XXXXX` with projectID from https://cloud.walletconnect.com

## Usage

Once the app is running, connect to your wallet using the "Connect" button. You can then enter a new entry in the guestbook form and click "Add Entry" to submit it. You will be asked to confirm this transaction on your wallet. Once approved, your entry will be added to the blockchain and displayed on the screen.
