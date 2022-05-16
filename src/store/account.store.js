import create from "zustand";

export const useAccount = create((set) => ({
  account: null,
  accountId: "",
  isWalletConnected: false,
  balance: "0",
  balanceNumber: 0,
  totalPoints: 0,
  timeRemaining: 0,
  accountLoading: true,

  setAccount(account) {
    set({
      account,
      accountId: account.accountId,
      isWalletConnected: Boolean(account.accountId),
      // accountLoading: false,
    });
  },
  setBalance(balance) {
    set({ balance, balanceNumber: +balance });
  },
  setPoints(totalPoints) {
    set({ totalPoints });
  },
  setTimeRemaining(timeRemaining) {
    set({ timeRemaining });
  },
  setAccountLoading(accountLoading) {
    set({ accountLoading });
  },
}));

export default useAccount;
