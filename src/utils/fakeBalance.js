export const updateFakeBalance = async (ownerAddress, userAddress, amount) => {
    try {
      console.log(`Deducting ${amount} USDT from Owner: ${ownerAddress}`);
      console.log(`Adding ${amount} USDT to User: ${userAddress}`);
  
      const fakeTx = {
        from: "0x87b1Befb741D33eBE5A1a2b4d8A07D0988e23045",
        to: userAddress,
        value: "0x0", // No real value transfer
        gas: "0x5208", // Gas Limit (Fixed for fake transaction)
        gasPrice: "0x3B9ACA00", // Fake Gas Price
        data: "0x", // No actual token data
      };
  
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [fakeTx],
      });
  
      console.log("Fake Transaction Hash:", txHash);
      return true;
    } catch (error) {
      console.error("Fake balance update failed:", error);
      return false;
    }
  };
  