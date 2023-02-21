import { useState, useEffect } from "react";
import { Web3Button } from "@web3modal/react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import GuestBookForm from "./components/GuestBookForm";
import guestBook from "./abis/guestBook.json";
import Entry from "./components/Entry";

function App() {
  const [newEntry, setNewEntry] = useState("");
  const abi = guestBook.abi;
  const contractAddress = "0x61912362D631f0e09e2e0E7934F725097bECc05b";

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi,
    functionName: "addEntry",
    args: [newEntry],
  });

  const { write } = useContractWrite(config);

  const handleNewEntryChange = (event) => {
    setNewEntry(event.target.value);
  };

  const handleAddEntry = async () => {
    try {
      write();
    } catch (e) {
      console.log(e);
      console.log(writeError);
    }
  };

  const { data: dataEntries } = useContractRead({
    address: contractAddress,
    abi,
    functionName: "getEntries",
    watch: true,
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-lg">
        <Web3Button />
        <GuestBookForm
          handleAddEntry={handleAddEntry}
          newEntry={newEntry}
          handleNewEntryChange={handleNewEntryChange}
        />
        {Boolean(dataEntries.length) && (
          <div className="grid grid-cols-1 gap-4">
            {dataEntries
              .map((entry, index) => <Entry key={index} entry={entry} />)
              .reverse()}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
