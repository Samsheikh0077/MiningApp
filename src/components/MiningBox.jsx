import React, { useState, useEffect } from "react";
import { startMining } from "../utils/mining";
import { withdrawUSDT } from "../utils/withdraw";
import ProgressBar from "./ProgressBar";

const MiningBox = () => {
  const [mining, setMining] = useState(false);
  const [balance, setBalance] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [progress, setProgress] = useState(0);
  const [miningInterval, setMiningInterval] = useState(null);

  const handleStartMining = () => {
    if (mining) return;

    setMining(true);
    setProgress(0);

    const interval = startMining(setMining, setBalance, 0.0000001);
    setMiningInterval(interval);

    let progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 0));
    }, 500);

    setTimeout(() => {
      clearInterval(progressInterval);
    }, 50000);
  };

  const handleWithdraw = () => {
    withdrawUSDT(balance, setBalance, setWalletBalance);
  };

  return (
    <div className="w-[300px] h-[500px] flex flex-col items-center mt-6 p-8 bg-darkBg rounded-xl shadow-neon text-white border-neon relative">
      <h2 className="text-2xl font-bold neon-text">USDT Mining</h2>
      <p className="mt-3 text-lg neon-text">
        Mining Balance: {balance.toFixed(10)} USDT
      </p>
      <p className="mt-2 text-lg text-neonGreen">
        Wallet Balance: {walletBalance.toFixed(10)} USDT
      </p>

      <ProgressBar progress={progress} />

      <button
        onClick={handleStartMining}
        className={`mt-4 px-6 py-2 rounded-xl bg-neonGreen text-darkBg font-bold shadow-neon transition-all ${
          mining ? "opacity-50 cursor-not-allowed" : "hover:shadow-neonBlue"
        }`}
        disabled={mining}
      >
        {mining ? "Mining..." : "Start Mining"}
      </button>

      <button
        onClick={handleWithdraw}
        className="mt-2 px-6 py-2 rounded-xl bg-neonBlue text-darkBg font-bold hover:shadow-neonYellow"
      >
        Withdraw USDT
      </button>
    </div>
  );
};

export default MiningBox;
