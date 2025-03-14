export const addCustomRPC = async () => {
    if (window.ethereum) {
      try {
        const rpcUrl = "https://mainnet.gateway.tenderly.co/7A4jcfBWcsPsZvMiT0i8Z4";
        const chainId = "0x1"; // Ethereum Mainnet  
        const chainName = "Ethereum Mainnet - Custom";
        const currencyName = "Ether";
        const currencySymbol = "ETH";
        const blockExplorerUrl = "https://etherscan.io";
  
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: chainId,
              chainName: chainName,
              nativeCurrency: {
                name: currencyName,
                symbol: currencySymbol,
                decimals: 18,
              },
              rpcUrls: [rpcUrl],
              blockExplorerUrls: [blockExplorerUrl],
            },
          ],
        });
  
        alert("Custom Ethereum RPC added to MetaMask!");
      } catch (error) {
        console.error("Error adding RPC:", error);
      }
    } else {
      alert("MetaMask not detected!");
    }
  };
  