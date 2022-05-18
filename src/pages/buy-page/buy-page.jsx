import { useEffect, useState } from "react";

import Card from "../../components/Card";

import useAccount from "../../store/account.store";

const BuyPage = () => {
  const { accountId, coins, addCoins } = useAccount();

  const [loading, setLoading] = useState(true);
  const [isBuying, setIsBuying] = useState(false);
  const [buyingId, setBuyingId] = useState("");
  const [cards, setCards] = useState();

  useEffect(() => {
    (async () => {
      // TODO: SC calls to fetch list of marketplace stuff, using localStorage as dummy
      setCards(
        localStorage.getItem("marketplace")
          ? JSON.parse(localStorage.getItem("marketplace"))
          : []
      );

      setLoading(false);
    })();
  }, []);

  const onBuy = async (id, buyersList, price) => {
    console.log({ buyersList, coins, price, accountId });

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

  console.log(coins);

  if (loading) return null;

  return (
    <div className="buy">
      <div className="card-list">
        {cards.map((nft) => (
          <Card
            key={nft.id}
            id={nft.id}
            image={nft.ipfsUrl}
            title={nft.name}
            tag={nft.minterId}
            time={nft.numSold}
            series={nft.rarity}
            price={nft.price}
            bidText="cost"
            buttonText={
              isBuying && buyingId === nft.id ? "Buying..." : "Buy Now"
            }
            buyVisible={true}
            onClickBtn={() => onBuy(nft.id, nft.buyersList || [], nft.price)}
            btnDisabled={
              isBuying ||
              nft.price > coins ||
              nft.buyersList?.includes(accountId)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default BuyPage;
