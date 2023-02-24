import { useEffect, useState } from "react";
import { Web3Button, useWeb3ModalTheme } from "@web3modal/react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import GuestBookForm from "./components/GuestBookForm";
import Entry from "./components/Entry";
import guestBook from "./abis/guestBook.json";

function App() {
  const { setTheme } = useWeb3ModalTheme();
  const [newEntry, setNewEntry] = useState("");
  const [txnHash, setTxnHash] = useState("");
  const abi = guestBook.abi;
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

  setTheme({
    themeMode: "dark",
    themeColor: "default",
    themeBackground: "gradient",
  });

  const { data: dataEntries } = useContractRead({
    address: contractAddress,
    abi,
    functionName: "getEntries",
    watch: true,
  });

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi,
    functionName: "addEntry",
    args: [newEntry],
  });

  const { data: writeGuestBookData, write } = useContractWrite(config);

  const handleNewEntryChange = (event) => {
    setNewEntry(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    write?.();
    setNewEntry("");
  };

  if (writeGuestBookData?.hash !== undefined) {
    console.log(writeGuestBookData?.hash);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-lg m-2">
        <Web3Button label="Connect" icon="hide" className="web3modal" />
        <GuestBookForm
          handleSubmit={handleSubmit}
          handleNewEntryChange={handleNewEntryChange}
          newEntry={newEntry}
        />
        {Boolean(dataEntries.length) ? (
          <div className="grid grid-cols-1 gap-4">
            {dataEntries
              .map((entry, index) => <Entry key={index} entry={entry} />)
              .reverse()}
          </div>
        ) : (
          <h1>No reseults</h1>
        )}
      </div>
    </div>
  );
}

export default App;
