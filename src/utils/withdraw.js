export const withdrawUSDT = (balance, setBalance, setWalletBalance) => {
  if (balance <= 0) {
    alert("You have no USDT to withdraw!");
    return;
  }

  // Fake transfer logic
  setWalletBalance((prev) => prev + balance);
  setBalance(0);
  alert(`Successfully withdrawn ${balance.toFixed(10)} USDT!`);
};
