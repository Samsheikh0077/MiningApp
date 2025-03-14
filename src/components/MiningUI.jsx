import React from "react";

const MiningUI = ({ wallet }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h2 className="text-xl font-bold">Welcome, {wallet.address}</h2>
      <p>Your mining will start soon...</p>
    </div>
  );
};

export default MiningUI;
