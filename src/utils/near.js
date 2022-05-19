import environment from "./config";
import { connect, Contract, keyStores, WalletConnection } from "near-api-js";
import { formatNearAmount } from "near-api-js/lib/utils/format";

const nearEnv = environment("testnet");

export async function initializeContract() {
  const near = await connect(
    Object.assign(
      { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
      nearEnv
    )
  );
  window.walletConnection = new WalletConnection(near);
  window.accountId = window.walletConnection.getAccountId();
  window.contract = new Contract(
    window.walletConnection.account(),
    nearEnv.contractName,
    {
      viewMethods: [
        "get_status",
        "get_auction",
        "get_auctioned_tokens",
        "get_total_auction_count",
        "get_current_token_number",
        "nft_tokens_for_owner",
        "nft_token",
      ],
      changeMethods: [
        "set_status",
        "nft_mint",
        "nft_transfer",
        "nft_transfer_call",
        "create_auction",
        "bid",
        "claim_nft",
        "claim_near",
        "claim_back_nft"
      ],
    }
  );
}

export async function accountBalance() {
  return formatNearAmount(
    (await window.walletConnection.account().getAccountBalance()).total,
    2
  );
}

export async function getAccountId() {
  return window.walletConnection.getAccountId();
}

export function login() {
  window.walletConnection.requestSignIn(nearEnv.contractName);
}

export function logout() {
  window.walletConnection.signOut();
  window.location.href = "/";
}
