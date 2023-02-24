import { useAccount } from "wagmi";

const GuestBookForm = ({ handleSubmit, handleNewEntryChange, newEntry }) => {
  const { isConnected } = useAccount();

  return (
    <div className="bg-white shadow-md rounded px-8 py-6 mb-8 mt-2">
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
        <div className="flex justify-between">
          <a href="https://goerlifaucet.com/" target="_blank">
            <input
              className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              type="button"
              disabled={!isConnected}
              value="Get Test Funds"
            />
          </a>

          <input
            className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
