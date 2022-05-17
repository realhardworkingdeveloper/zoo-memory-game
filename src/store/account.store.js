import create from "zustand";

export const useAccount = create((set, get) => ({
  account: null,
  accountId: "",
  isWalletConnected: false,
  balance: "0",
  balanceNumber: 0,
  totalPoints: 0, // total of all points
  tempPoints: 0, // points acquired from game
  permPoints: 0, // permanent points from staking
  coins: 0, // ZCM/token
  timeRemaining: 0,
  accountLoading: true,

  setAccount(account) {
    set({
      account,
      accountId: account.accountId,
      isWalletConnected: Boolean(account.accountId),
    });
  },
  setBalance(balance) {
    set({ balance, balanceNumber: +balance });
  },

  // setting points/coins directly
  setPoints(totalPoints) {
    set({ totalPoints });
  },
  setPermPoints(permPoints) {
    set({ permPoints });
  },
  setTempPoints(tempPoints) {
    set({ tempPoints });
  },
  setCoins(coins) {
    set({ coins });
  },

  // adding points/coins (can take -ve values)(adds to totalPoints as well)
  addTempPoints(val) {
    set({
      tempPoints: get().tempPoints + val,
      totalPoints: get().totalPoints + val,
    });
  },
  addPermPoints(val) {
    set({
      permPoints: get().permPoints + val,
      totalPoints: get().totalPoints + val,
    });
  },
  addCoins(val) {
    set({ coins: get().coins + val });
  },

  setTimeRemaining(timeRemaining) {
    set({ timeRemaining });
  },

  // account loading status
  setAccountLoading(accountLoading) {
    set({ accountLoading });
  },
}));

export default useAccount;
