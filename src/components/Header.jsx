import React from "react";
import WalletConnect from "./WalletConnect";

const Header = ({ setUserWallet }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-darkBg text-white">
      <h1 className="text-2xl font-bold">USDT Miner</h1>
      <WalletConnect setUserWallet={setUserWallet} />
    </header>
  );
};

export default Header;
