import React from "react";

const Entry = ({ entry, txnHash }) => {
  const { message, sender, timestamp } = entry;
  const timestampInt = timestamp.toNumber();
  const date = new Date(timestampInt * 1000);
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const time = date.toLocaleTimeString();
  const dateStr = `${month} ${day}, ${time}`;

  return (
    <a href={`https://goerli.etherscan.io/tx/${txnHash}`} target="_blank">
      <div className="bg-white shadow-md rounded-md p-4 mb-4 flex flex-col">
        <div className="text-gray-800 font-medium mb-2">{message}</div>
        <div className="text-gray-600 text-sm mb-2">
          <span className="font-medium">From:</span> {sender}
        </div>
        <div className="text-gray-600 text-sm self-end">{dateStr}</div>
      </div>
    </a>
  );
};

export default Entry;
