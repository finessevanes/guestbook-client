# Guestbook App

This is a simple guestbook app built with Vite that allows users to add new entries and display them on the screen. The app uses the `@web3modal/react` package to connect to a wallet and `wagmi` to interact with a smart contract. The smart contract has been deployed to the [Goerli network](https://goerli.etherscan.io/address/0xCC64aE81777169420be5e8c73f209F0733F3ac00).

## Getting Started

1. Clone the repository to your local machine and navigate to the project directory
2. Install the project dependencies

```
yarn
```

3. Create a new file called `.env` in the project directory to store your WalletConnect project ID:

```
touch .env
```

4. Open the `.env` file in a text editor and add the following line:

```
VITE_PROJECT_ID=XXXXXX
VITE_GOERLI_CONTRACT_ADDRESS=0xCC64aE81777169420be5e8c73f209F0733F3ac00
```

- Replace XXXXXX with your own project ID obtained from https://cloud.walletconnect.com.

5. Start the local development server:

```
yarn dev
```

This should launch the app in your default browser at `http://127.0.0.1:5173/`. If the app does not launch automatically, you can manually navigate to the URL in your browser

## Usage

Once the app is running, connect to your wallet using the "Connect" button. You can then enter a new entry in the guestbook form and click "Add Entry" to submit it. You will be asked to confirm this transaction on your wallet. Once approved, your entry will be added to the blockchain and displayed on the screen.
