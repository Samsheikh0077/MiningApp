import React, { useState, useEffect } from 'react';
import { Wallet, Settings, Share2, MessageCircle, Copy } from 'lucide-react';

interface NFTChip {
  id: number;
  name: string;
  power: string;
  image: string;
  owned: number;
  total: number;
  powerValue: number;
}

interface WalletDetails {
  address: string;
  key: string;
}

interface SocialLink {
  name: string;
  icon: string;
  url: string;
  bgColor: string;
}

function App() {
  const [headerBalance, setHeaderBalance] = useState<number>(3);
  const [miningPower, setMiningPower] = useState<number>(0.00032151);
  const [pendingReward, setPendingReward] = useState<number>(0);
  const [showWallet, setShowWallet] = useState(false);
  const [showNFTDetails, setShowNFTDetails] = useState(false);
  const [showRentConfirmation, setShowRentConfirmation] = useState(false);
  const [showTransactionVerification, setShowTransactionVerification] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [selectedNFT, setSelectedNFT] = useState<NFTChip | null>(null);
  const [walletDetails, setWalletDetails] = useState<WalletDetails>({
    address: '0x822345CF1B96F8a1F79228616479fBD3c0e0314d',
    key: ''
  });
  const [latency, setLatency] = useState<number>(208);

  const nftChips: NFTChip[] = [
    { id: 1, name: "Basic Chip", power: "0.5 TON", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400", owned: 0, total: 1, powerValue: 0.0001 },
    { id: 2, name: "Standard Chip", power: "1 TON", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400", owned: 0, total: 1, powerValue: 0.0002 },
    { id: 3, name: "Advanced Chip", power: "5 TON", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400", owned: 0, total: 1, powerValue: 0.0005 },
    { id: 4, name: "Premium Chip", power: "10 TON", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400", owned: 0, total: 1, powerValue: 0.001 }
  ];

  const socialLinks: SocialLink[] = [
    {
      name: "Telegram",
      icon: "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg",
      url: "https://t.me/your-telegram-username",
      bgColor: "bg-[#0088cc]"
    },
    {
      name: "WhatsApp",
      icon: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
      url: "https://wa.me/your-number",
      bgColor: "bg-[#25D366]"
    },
    {
      name: "Messenger",
      icon: "https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg",
      url: "https://m.me/your-username",
      bgColor: "bg-[#006AFF]"
    },
    {
      name: "LINE",
      icon: "https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg",
      url: "https://line.me/R/ti/p/@your-line-id",
      bgColor: "bg-[#00B900]"
    },
    {
      name: "Twitter",
      icon: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg",
      url: "https://twitter.com/your-username",
      bgColor: "bg-[#1DA1F2]"
    }
  ];

  // Simulate mining power fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      const fluctuation = (Math.random() - 0.5) * 0.00000001;
      setMiningPower(prev => Math.max(prev + fluctuation, 0.00032150));
      
      // Update pending reward based on mining power
      setPendingReward(prev => prev + (miningPower * 0.1));
      
      // Simulate network latency changes
      setLatency(Math.floor(200 + Math.random() * 20));
    }, 1000);

    return () => clearInterval(interval);
  }, [miningPower]);

  const handleClaim = () => {
    setHeaderBalance(prev => prev + pendingReward);
    setPendingReward(0);
  };

  const handleNFTClick = (nft: NFTChip) => {
    setSelectedNFT(nft);
    setShowNFTDetails(true);
  };

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const handleRentClick = () => {
    setShowRentConfirmation(true);
    setShowNFTDetails(false);
  };

  const handleConfirmRent = () => {
    setShowRentConfirmation(false);
    setShowTransactionVerification(true);
  };

  const handleVerifyTransaction = () => {
    if (selectedNFT && transactionId.trim()) {
      // Increase mining power based on the NFT's power value
      setMiningPower(prev => prev + selectedNFT.powerValue);
      
      // Update the owned count for the selected NFT
      const updatedNFTs = nftChips.map(nft => 
        nft.id === selectedNFT.id 
          ? { ...nft, owned: nft.owned + 1 }
          : nft
      );
      
      // Reset states
      setShowTransactionVerification(false);
      setTransactionId('');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gradient-to-b from-gray-900 to-black border-b border-gray-800">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="bg-blue-500 p-1 rounded-lg">
                  <span className="text-xl">$</span>
                </div>
                <span className="ml-2 text-xl font-bold">{headerBalance.toFixed(8)} $USDT</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">{latency}ms</span>
              <button onClick={() => setShowWallet(true)} className="p-2 hover:bg-gray-800 rounded-full">
                <Wallet className="w-6 h-6" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-full">
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 max-w-4xl mx-auto">
        {/* Mining Stats */}
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-400">Total Power:</p>
              <p className="text-2xl font-bold">{miningPower.toFixed(8)} USDT/s</p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Pending reward:</span>
              <span className="text-xl font-bold">{pendingReward.toFixed(8)} USDT</span>
            </div>
          </div>
          <button
            onClick={handleClaim}
            className="w-full py-3 bg-gradient-to-r from-red-500 to-green-500 rounded-lg font-bold hover:opacity-90 transition-opacity"
          >
            Claim
          </button>
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {nftChips.map(nft => (
            <div
              key={nft.id}
              onClick={() => handleNFTClick(nft)}
              className="bg-gray-900 rounded-lg p-4 cursor-pointer hover:bg-gray-800 transition-colors"
            >
              <img src={nft.image} alt={nft.name} className="w-full h-32 object-cover rounded-lg mb-2" />
              <p className="text-center">{nft.owned}/{nft.total}</p>
              <p className="text-center font-bold">{nft.power}</p>
            </div>
          ))}
        </div>

        {/* Invite Friends */}
        <div className="mt-8 bg-gray-900 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Invite friends</h2>
            <Share2 className="w-6 h-6" />
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {socialLinks.map(platform => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${platform.bgColor} p-3 rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity`}
              >
                <img src={platform.icon} alt={platform.name} className="w-6 h-6" />
              </a>
            ))}
            <button
              onClick={handleCopyInviteLink}
              className="bg-gray-800 p-3 rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <Copy className="w-6 h-6" />
            </button>
          </div>
        </div>
      </main>

      {/* Wallet Modal */}
      {showWallet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Wallet Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-1">Address</label>
                <input
                  type="text"
                  value={walletDetails.address}
                  onChange={(e) => setWalletDetails(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full bg-gray-800 rounded p-2"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Key</label>
                <input
                  type="password"
                  value={walletDetails.key}
                  onChange={(e) => setWalletDetails(prev => ({ ...prev, key: e.target.value }))}
                  className="w-full bg-gray-800 rounded p-2"
                />
              </div>
              <button
                onClick={() => setShowWallet(false)}
                className="w-full bg-blue-600 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NFT Details Modal */}
      {showNFTDetails && selectedNFT && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">NFT Chip Special</h2>
              <button onClick={() => setShowNFTDetails(false)} className="text-gray-400 hover:text-white">
                ×
              </button>
            </div>
            <img src={selectedNFT.image} alt={selectedNFT.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Rent period</span>
                <span>30 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Daily yield</span>
                <span className="text-red-500">20.844 USDT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total yield</span>
                <span className="text-red-500">625.32 USDT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Price</span>
                <span>{selectedNFT.power}</span>
              </div>
            </div>
            <button 
              onClick={handleRentClick}
              className="w-full bg-red-600 py-3 rounded-lg font-bold mt-4 hover:bg-red-700 transition-colors"
            >
              Rent
            </button>
          </div>
        </div>
      )}

      {/* Rent Confirmation Modal */}
      {showRentConfirmation && selectedNFT && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Confirm Rental</h2>
              <button onClick={() => setShowRentConfirmation(false)} className="text-gray-400 hover:text-white">
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Package Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">NFT Name:</span>
                    <span>{selectedNFT.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Power:</span>
                    <span>{selectedNFT.power}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span>30 days</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Wallet Address</label>
                <div className="w-full bg-gray-800 rounded p-3 text-white">
                  {walletDetails.address}
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Amount:</span>
                  <span className="text-xl font-bold">{selectedNFT.power}</span>
                </div>
              </div>
              <button
                onClick={handleConfirmRent}
                className="w-full bg-gradient-to-r from-red-500 to-green-500 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transaction Verification Modal */}
      {showTransactionVerification && selectedNFT && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Verify Transaction</h2>
              <button onClick={() => setShowTransactionVerification(false)} className="text-gray-400 hover:text-white">
                ×
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-400">Please enter your transaction ID to complete the rental process:</p>
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Enter transaction ID"
                className="w-full bg-gray-800 rounded p-3 text-white"
              />
              <button
                onClick={handleVerifyTransaction}
                disabled={!transactionId.trim()}
                className={`w-full py-3 rounded-lg font-bold ${
                  transactionId.trim()
                    ? 'bg-gradient-to-r from-red-500 to-green-500 hover:opacity-90'
                    : 'bg-gray-700 cursor-not-allowed'
                } transition-all`}
              >
                Verify Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
