import React, { useState } from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import guestBook from "../abis/guestBook.json";

const GuestBookForm = () => {
  const [newEntry, setNewEntry] = useState("");
  const abi = guestBook.abi;
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
  const { isConnected } = useAccount();

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

  console.log("writeGuestBookData", writeGuestBookData?.hash);

  return (
    <div className="bg-white shadow-md rounded px-8 py-6 mb-8">
      <h1 className="text-4xl font-bold mb-4">Guest Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="entry">
            Write a new entry
          </label>
          <textarea
            id="entry"
            name="entry"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
            placeholder="Enter your message..."
            value={newEntry}
            onChange={handleNewEntryChange}
          />
        </div>
        <div className="flex justify-end">
          <input
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={!isConnected}
            value="Add Entry"
          />
        </div>
      </form>
    </div>
  );
};

export default GuestBookForm;
