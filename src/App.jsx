import { useState, useEffect } from "react";
import { Web3Button } from "@web3modal/react";
import { WagmiConfig, useAccount } from "wagmi";
import GuestBookForm from "./components/GuestBookForm";

function App() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const { isConnected } = useAccount();

  const handleNewEntryChange = (event) => {
    setNewEntry(event.target.value);
  };

  const handleAddEntry = async () => {
    console.log("test");
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-lg">
          <Web3Button />
          {isConnected && (
            <GuestBookForm
              handleAddEntry={handleAddEntry}
              newEntry={newEntry}
              handleNewEntryChange={handleNewEntryChange}
            />
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
