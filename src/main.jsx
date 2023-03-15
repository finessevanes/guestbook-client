import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli, localhost, sepolia } from "wagmi/chains";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const chains = [goerli, sepolia, localhost];
const projectId = import.meta.env.VITE_PROJECT_ID;
const { provider } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({
    projectId,
    version: 1,
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
