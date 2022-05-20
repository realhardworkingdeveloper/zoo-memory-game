import { useEffect, useState } from "react";
import { array } from "yup";
import { utils } from "near-api-js";
import Big from "big.js";

import Card from "../../components/Card";

import useAccount from "../../store/account.store";

const MyBidsPage = () => {
  const { accountId, coins, addCoins } = useAccount();

  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    (async () => {
      // TODO: SC calls to fetch list of USER'S BIDS - IMPORTANT
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
    // TODO: add logic here to claim NFT of which user has won bid

    console.log({ buyersList, coins, price, accountId });
    alert("Coming soon!");
    return;
  };

  if (loading) return null;

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
            bidText={nft.auction_type === "instant" ? "buy" : "top bid"}
            buttonText="Claim NFT"
            buyVisible={
              Date.now() > nft.end_time && nft.winner_id === accountId
            }
            onClickBtn={() => {
              // TODO: REPLACE ONBUY with any ONCLAIMNFT function u make
              onBuy();
            }}
            // TODO: update auction type stuff here
            startTime={nft.auction_type === "instant" ? 0 : nft.start_time}
            endTime={nft.auction_type === "instant" ? 0 : nft.end_time}
          />
        ))}
      </div>
    </div>
  );
};

export default MyBidsPage;
