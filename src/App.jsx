import { useEffect, useState } from "react";
import { Web3Button, useWeb3ModalTheme } from "@web3modal/react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
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
    themeMode: "light",
    themeColor: "blackWhite",
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

  const { isLoading } = useWaitForTransaction({
    hash: writeGuestBookData?.hash,
  });

  const handleNewEntryChange = (event) => {
    setNewEntry(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    write?.();
    setNewEntry("");
  };

  useEffect(() => {
    if (writeGuestBookData?.hash !== undefined) {
      setTxnHash(writeGuestBookData.hash);
    }
  }, [writeGuestBookData]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-lg m-2">
        <Web3Button label="Connect" icon="hide" className="web3modal" />
        <GuestBookForm
          handleSubmit={handleSubmit}
          handleNewEntryChange={handleNewEntryChange}
          newEntry={newEntry}
        />
        {isLoading && (
          <div className="bg-white shadow-md rounded-md p-4 mb-4 flex flex-col">
            <div className="text-gray-600 text-sm mb-2">
              Your transaction is pending. Click{" "}
              <a
                href={`https://goerli.etherscan.io/tx/${txnHash}`}
                target="_blank"
                className="text-blue-500"
              >
                here
              </a>{" "}
              to view it on Etherscan
            </div>
          </div>
        )}
        <div className="max-h-screen overflow-y-auto">
          {Boolean(dataEntries?.length) ? (
            <div className="grid grid-cols-1 gap-4">
              {dataEntries
                .map((entry, index) => <Entry key={index} entry={entry} />)
                .reverse()}
            </div>
          ) : (
            <h1>No results</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
