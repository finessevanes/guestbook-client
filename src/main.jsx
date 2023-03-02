import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli, localhost, sepolia } from "wagmi/chains";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const chains = [goerli, sepolia, localhost];
const projectId = import.meta.env.VITE_PROJECT_ID;
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId }),
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    projectId,
    version: "1",
    appName: "ETH Denver",
    chains,
  }),
  provider,
});

const ethereumClient = new EthereumClient(wagmiClient, chains);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <WagmiConfig client={wagmiClient}>
      <App />
    </WagmiConfig>
    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
  </>
);
