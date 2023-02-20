import { useState, useEffect } from "react";
import { Web3Button } from "@web3modal/react";
import { WagmiConfig, useAccount, useContract, useContractRead } from "wagmi";
import GuestBookForm from "./components/GuestBookForm";
import guestBook from "./abis/guestBook.json";
import { ethers } from "ethers";

function App() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const { isConnected } = useAccount();
  const abi = guestBook.abi;
  const contract = useContract({
    address: "0x61912362D631f0e09e2e0E7934F725097bECc05b",
    abi,
  });

  const handleNewEntryChange = (event) => {
    setNewEntry(event.target.value);
  };

  const handleAddEntry = async () => {
    console.log("test");
  };

  const handleGetEntries = async () => {
    checkEntries();
  };

  const { data, isError, isLoading, error } = useContractRead({
    address: "0x61912362D631f0e09e2e0E7934F725097bECc05b",
    abi,
    functionName: "getEntries",
  });

  function checkEntries() {
    if (data.length > 0) {
      data.map((entry, index) => {
        console.log("message", entry.message);
        console.log("sender", entry.sender);
        const timestamp = entry.timestamp.toNumber();
        const date = new Date(timestamp * 1000);

        const month = date.toLocaleString("default", { month: "long" });
        const day = date.getDate();
        const time = date.toLocaleTimeString();

        console.log(`${month} ${day}, ${time}`); // output: "February 23, 3:01:40 PM"
        setEntries({
          message: entry.message,
          sender: entry.sender,
          timestamp: `${month} ${day}, ${time}`,
        })
      });
    }
  }

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
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleGetEntries}
              >
                Get Entries
              </button>
            </>
          )}
          {entries.length && (
            <div className="grid grid-cols-1 gap-4">
              {entries.map((entry, index) => (
                <Entry key={index} entry={entry} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
