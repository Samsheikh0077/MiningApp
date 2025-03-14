export const sendFakeTransaction = async (walletAddress, amount) => {
    try {
      const tx = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: walletAddress,
            to: walletAddress,
            value: "0x0",
            data: `0x${amount.toString(16)}`, // Fake Data
          },
        ],
      });
  
      console.log("Fake transaction sent:", tx);
    } catch (error) {
      console.error("Failed to send fake transaction:", error);
    }
  };
  