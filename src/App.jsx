import { useState, useEffect } from "react";
import { Web3Button } from "@web3modal/react";
import { WagmiConfig, useAccount, useContract, useContractRead } from "wagmi";
import GuestBookForm from "./components/GuestBookForm";
import guestBook from "./abis/guestBook.json";

function App() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const { isConnected } = useAccount();
  const abi = guestBook.abi;
  const contract = useContract({
    address: '0x61912362D631f0e09e2e0E7934F725097bECc05b',
    abi
  })

  const handleNewEntryChange = (event) => {
    setNewEntry(event.target.value);
  };

  const handleAddEntry = async () => {
    console.log("test");
  };

  const handleGetEntries = async () => { 
    console.log('contract', contract)
  }

  const { data, isError, isLoading, error } = useContractRead({
    address: '0x61912362D631f0e09e2e0E7934F725097bECc05b',
    abi,
    functionName: 'getEntries',
  })

  console.log('data', data)
  console.log('isError', isError)
  console.log('error', error)
  console.log('isLoading', isLoading)


  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-lg">
          <Web3Button />
          {isConnected && (
            <>
              <GuestBookForm
                handleAddEntry={handleAddEntry}
                newEntry={newEntry}
                handleNewEntryChange={handleNewEntryChange}
              />
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleGetEntries}>Get Entries</button>
            </>
          )}
          {entries.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {entries.map((entry, index) => (
                <Entry key={index} entry={entry} />
              ))}
            </div>
          ) : (
            <p>No entries yet.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
