import { useEffect, useState } from "react";
import Card from "../../components/Card";

const CreatedList = ({ setSellingPage, setSellingNft }) => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      // TODO: add SC call here to fetch list of minted NFTs, using localStorage for dummy data
      let minted = await window.contract.nft_tokens_for_owner({
        account_id: window.accountId
      })
      console.log("minted", minted)
      const auctionedTokenIds = await window.contract.get_auctioned_tokens()
      console.log("auctionedTokenIds", auctionedTokenIds)
      minted = minted.filter(item => !auctionedTokenIds.includes(item.token_id))

      setList(minted);
      setLoading(false);
    })();
  }, []);

  if (loading) return;

  return (
    <div className="created__list">
      {list.map((nft, index) => (
        <Card
          key={index}
          id={nft.token_id}
          image={nft.metadata.media}
          title={nft.metadata.title}
          tag={nft.owner_id}
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
