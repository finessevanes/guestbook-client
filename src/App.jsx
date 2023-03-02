import { useEffect, useState } from "react";
// import @web3modal/react and wagmi
import GuestBookForm from "./components/GuestBookForm";
import Entry from "./components/Entry";
import guestBook from "./abis/guestBook.json";

function App() {
  const [newEntry, setNewEntry] = useState("");
  const [txnHash, setTxnHash] = useState("");
  const abi = guestBook.abi;
  const goerliContractAddress = import.meta.env.VITE_GOERLI_CONTRACT_ADDRESS;
  let isLoading;
  let dataEntries;

  // set theme

  // useContractRead to read data from the contract

  // useContractWrite to write data to the contract

  // usePrepareContractWrite to prepare the write

  // useContractCall to call the contract


  // useWaitForTransaction to wait for the transaction to be minded and get the transaction hash

  const handleNewEntryChange = (event) => {
    setNewEntry(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // write?.();
    setNewEntry("");
  };

  // set txnHash when writeGuestBookData is updated (useEffect)

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-lg m-2">
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
  );
}

export default App;
