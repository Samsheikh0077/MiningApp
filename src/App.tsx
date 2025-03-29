import React, { useState } from 'react';
import { Wallet, Settings, Share2 } from 'lucide-react';

interface NFTChip {
  id: number;
  name: string;
  power: string;
  image: string;
  owned: number;
  total: number;
}

interface WalletDetails {
  address: string;
  key: string;
}

function App() {
  const [balance, setBalance] = useState<number>(0);
  const [miningPower, setMiningPower] = useState<number>(0.00032151);
  const [showWallet, setShowWallet] = useState(false);
  const [showNFTDetails, setShowNFTDetails] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<NFTChip | null>(null);
  const [walletDetails, setWalletDetails] = useState<WalletDetails>({
    address: '',
    key: ''
  });

  const nftChips: NFTChip[] = [
    { id: 1, name: "Basic Chip", power: "0.5 SOL", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400", owned: 0, total: 1 },
    { id: 2, name: "Standard Chip", power: "1 SOL", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400", owned: 0, total: 1 },
    { id: 3, name: "Advanced Chip", power: "5 SOL", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400", owned: 0, total: 1 },
    { id: 4, name: "Premium Chip", power: "10 SOL", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400", owned: 0, total: 1 }
  ];

  const handleClaim = () => {
    setBalance(prev => prev + 0.06976767);
  };

  const handleNFTClick = (nft: NFTChip) => {
    setSelectedNFT(nft);
    setShowNFTDetails(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <img src="https://media-hosting.imagekit.io/0072d84f9327425e/tether-usdt-logo.png?Expires=1837899126&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=ezXAWf1Q5NOw7DGOUgEIjfWM58axhmm48B1upzNzSC7MU9WF6gC7Lpv-3WfJjqw0MhdxHGRXaJJkF1Ez8-YcEpE2IlfFQNHosm2vzrr21MBU51d5hlcV4RQDniUKYFq3HlrYIc5cq5x6IGN2RCTWMPKl00ef5XYkyP8KXQO0HMtPM5O7pwdLuw2~coDXBenmm~a6M~jdU50yadbk8FOurl24SAz~Tmql2fixzQNLf~MAkALMccTSptOtdyhYGmBs3Q01rfpTanXO~qxR3vCbbJ37FmFDAZt4vOP-EOetzaYIIxUoVrB3t2oC0xAzxkBHpJQZQh1vW9aWbjOInoXM6A__" alt="USDT" className="w-8 h-8 rounded-full" />
          <span className="text-xl font-bold">Solana USDT Mining</span>
        </div>
        <div className="flex space-x-4">
          <button onClick={() => setShowWallet(true)} className="p-2 hover:bg-gray-800 rounded-full">
            <Wallet className="w-6 h-6" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-full">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 max-w-4xl mx-auto">
        {/* Mining Stats */}
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-400">Total Power:</p>
              <p className="text-2xl font-bold">{miningPower} USDT/s</p>
            </div>
            <div>
              <p className="text-gray-400">Balance:</p>
              <p className="text-2xl font-bold">{balance.toFixed(8)} USDT</p>
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
            {['Telegram', 'WhatsApp', 'Messenger', 'LINE', 'Twitter', 'Copy'].map(platform => (
              <button
                key={platform}
                className="bg-gray-800 p-2 rounded-lg text-center hover:bg-gray-700 transition-colors"
              >
                {platform}
              </button>
            ))}
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
            <button className="w-full bg-red-600 py-3 rounded-lg font-bold mt-4 hover:bg-red-700 transition-colors">
              Rent
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
