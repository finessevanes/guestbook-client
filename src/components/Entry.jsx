import React from "react";

const Entry = ({ entry }) => {
  return (
    <div className="bg-white shadow-md rounded p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">{entry.sender}</h2>
        <span className="text-gray-500 text-sm">{entry.timestamp.toNumber()}</span>
      </div>
      <p className="text-gray-700 my-2">{entry.message}</p>
    </div>
  );
};

export default Entry;
