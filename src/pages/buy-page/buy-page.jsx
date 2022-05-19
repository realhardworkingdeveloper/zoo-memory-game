import { useEffect, useState } from "react";
import { array } from "yup";
import { utils } from "near-api-js";
import Big from "big.js";

import Card from "../../components/Card";

import useAccount from "../../store/account.store";
import Bidding from "./bidding";

const BuyPage = () => {
  const { accountId, coins, addCoins } = useAccount();

  const [loading, setLoading] = useState(true);
  const [isBuying, setIsBuying] = useState(false);
  const [isBidding, setIsBidding] = useState(false);
  const [biddingNft, setBiddingNft] = useState(null);
  const [buyingId, setBuyingId] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    (async () => {
      // TODO: SC calls to fetch list of marketplace stuff, using localStorage as dummy
      const totalAuctionCount = await window.contract.get_total_auction_count();
      const array = Array(totalAuctionCount).fill(0);
      console.log("array", array);
      let auctions = await Promise.all(
        array.map(async (i, k) => {
          let auctionRow = await window.contract.get_auction({ auction_id: k });
          let tokenData = await window.contract.nft_token({
            token_id: auctionRow.auction_token,
          });
          return { ...auctionRow, tokenData };
        })
      );
      console.log("auctionItems", auctions);
      setCards(auctions);

      setLoading(false);
    })();
  }, []);

  const onBuy = async (id, buyersList, price) => {
    console.log({ buyersList, coins, price, accountId });
    alert("Coming soon!");
    return;

    // TODO: SC should also check if user owns the NFT incase this is surpassed
    if (buyersList?.includes(accountId)) return; // don't allow user to rebuy
    // TODO: SC should also have a check for user coins being enough
    if (coins < price) return;

    setBuyingId(id);
    setIsBuying(true);

    // TODO: SC call to buy the NFT (in localStorage, reducing user coins)
    addCoins(0 - price);
    localStorage.setItem("coins", +localStorage.getItem("coins") - price);
    const updatedCards = [...cards].map((nft) =>
      nft.id === id
        ? {
            ...nft,
            buyersList: [...nft.buyersList, accountId],
            numSold: nft.numSold + 1,
          }
        : { ...nft }
    );
    setCards(updatedCards);
    localStorage.setItem("marketplace", JSON.stringify(updatedCards));

    setIsBuying(false);
    setBuyingId("");
  };

  const onBid = (nft) => {
    setIsBidding(true);
    setBiddingNft({ ...nft });
  };

  if (loading) return null;

  if (isBidding) {
    return <Bidding {...biddingNft} setBidding={setIsBidding} />;
  }

  return (
    <div className="buy">
      <div className="card-list">
        {cards.map((nft, index) => (
          <Card
            key={nft.auction_id}
            type="auction"
            id={nft.tokenData.token_id}
            image={nft.tokenData.metadata.media}
            title={nft.tokenData.metadata.title}
            tag={nft.tokenData.owner_id}
            time={nft.numSold}
            series={nft.rarity}
            price={utils.format.formatNearAmount(
              Big(1).times(nft.current_price).toFixed()
            )}
            // TODO: add logic here for instant/bid
            bidText={nft.auction_type === "instant" ? "buy" : "highest bid"}
            buttonText={
              isBuying && buyingId === nft.id ? "Buying..." : "Buy Now"
            }
            buyVisible={true}
            onClickBtn={() => {
              // TODO: add logic here after updating SC and data for if condition
              if (nft.auction_type === "instant")
                onBuy(nft.id, nft.buyersList || [], nft.price);
              else onBid(nft);
            }}
            btnDisabled={
              isBuying ||
              nft.price > coins ||
              nft.buyersList?.includes(accountId)
            }
            // TODO: update auction type stuff here
            startTime={nft.auction_type === "instant" ? 0 : nft.start_time}
            endTime={nft.auction_type === "instant" ? 0 : nft.end_time}
          />
        ))}
      </div>
    </div>
  );
};

export default BuyPage;
