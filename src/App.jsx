import { useState, useEffect } from "react";
import { Web3Button } from "@web3modal/react";
import {
  WagmiConfig,
  useAccount,
  useContract,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import GuestBookForm from "./components/GuestBookForm";
import guestBook from "./abis/guestBook.json";
import Entry from "./components/Entry";

function App() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const { isConnected } = useAccount();
  const abi = guestBook.abi;
  const contractAddress = "0x61912362D631f0e09e2e0E7934F725097bECc05b";
  const contract = useContract({
    address: contractAddress,
    abi,
  });

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi,
    functionName: "addEntry",
    args: ["Pair programming is fun!"],
  });

  const {
    data: dataToWrite,
    isLoading: dataIsLoading,
    isSuccess,
    write,
    error: writeError,
  } = useContractWrite(config);

  const handleNewEntryChange = (event) => {
    setNewEntry(event.target.value);
  };

  const handleAddEntry = async () => {
    console.log("test");
    try {
      write();
    } catch (e) {
      console.log(e);
      console.log(writeError);
    }
  };

  const handleGetEntries = async () => {
    checkEntries();
  };

  const { data } = useContractRead({
    address: contractAddress,
    abi,
    functionName: "getEntries",
    watch: true,
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

        // setEntries(..);

        console.log("entries:: above undefined", entries);
        console.log(entries.length);
      });
    }
  }

  useEffect(() => {
    if (data) {
      checkEntries();
    }
  }, [data]);

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
          {data.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {data.map((entry, index) => (
                <Entry key={index} entry={entry} />
              ))}
            </div>
          ) : (
            <h1>Nothing</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
