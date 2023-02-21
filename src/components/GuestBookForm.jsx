import React from "react";
import { useAccount } from "wagmi";

const GuestBookForm = ({ handleAddEntry, newEntry, handleNewEntryChange }) => {
  const { isConnected } = useAccount();
  return (
    <div className="bg-white shadow-md rounded px-8 py-6 mb-8">
      <h1 className="text-4xl font-bold mb-4">Guest Book</h1>
      <form onSubmit={handleAddEntry}>
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
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={!isConnected}
          >
            Add Entry
          </button>
        </div>
      </form>
    </div>
  );
};

export default GuestBookForm;
