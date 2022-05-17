import { useEffect, useState } from "react";
import Card from "../../components/Card";

const CreatedList = ({ setSellingPage, setSellingId }) => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      // TODO: add SC call here to fetch list of minted NFTs, using localStorage for dummy data
      const minted = localStorage.getItem("minted")
        ? JSON.parse(localStorage.getItem("minted"))
        : [];

      setList(minted);
      setLoading(false);
    })();
  }, []);

  if (loading) return;

  return (
    <div className="created__list">
      {list.map((nft) => (
        <Card
          id={nft.id}
          image={nft.ipfsUrl}
          title={nft.name}
          tag={nft.minterId}
          buttonText="SELL"
          onClickBtn={() => {
            setSellingId(nft.id);
            setSellingPage(true);
          }}
        />
      ))}
    </div>
  );
};

export default CreatedList;
