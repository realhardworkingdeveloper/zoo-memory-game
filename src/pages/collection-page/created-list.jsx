import { useEffect, useState } from "react";
import useAccount from "../../store/account.store";
import Card from "../../components/Card";

const CreatedList = ({ setSellingPage, setSellingNft }) => {
  const { accountId } = useAccount();

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      // TODO: add SC call here to fetch list of owned NFTs, using localStorage for dummy data
      const minted = localStorage.getItem("marketplace")
        ? JSON.parse(localStorage.getItem("marketplace")).filter((x) =>
            x.buyersList.includes(accountId)
          )
        : [];

      setList(minted);
      setLoading(false);
    })();
  }, [accountId]);

  if (loading) return;

  return (
    <div className="created__list">
      {list.map((nft) => (
        <Card
          key={nft.id}
          id={nft.id}
          image={nft.ipfsUrl}
          title={nft.name}
          tag={accountId}
          series={nft.rarity}
          price={nft.price}
          buttonText="SELL"
          buyVisible
          onClickBtn={() => {
            setSellingNft(nft);
            setSellingPage(true);
          }}
        />
      ))}
    </div>
  );
};

export default CreatedList;
