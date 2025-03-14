export const startMining = (setMining, setBalance, miningSpeed) => {
    setMining(true);
  
    const miningInterval = setInterval(() => {
      setBalance((prevBalance) => prevBalance + miningSpeed);
    }, 1000);
  
    return miningInterval;
  };
  