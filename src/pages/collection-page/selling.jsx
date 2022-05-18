import { useFormik } from "formik";
import Button from "../../components/button/button";
import Card from "../../components/Card";
import * as Yup from "yup";
import { useEffect } from "react";
import { v4 } from "uuid";
import useAccount from "../../store/account.store";

const Selling = ({
  id,
  name,
  ipfsUrl,
  minterId,
  description,
  rarity,
  setSellingPage,
}) => {
  const { accountId, addCoins } = useAccount();

  useEffect(() => {
    if (!localStorage.getItem("marketplace"))
      localStorage.setItem("marketplace", JSON.stringify([]));
  }, []);

  const exitPage = () => {
    setSellingPage(false);
  };

  const formik = useFormik({
    initialValues: {
      price: "",
    },
    validationSchema: Yup.object().shape({
      rarity: Yup.number()
        .required("Price is required")
        .moreThan(0)
        .lessThan(100000),
    }),

    onSubmit: async (values, { resetForm }) => {
      // TODO: call SC to sell your NFT

      // const marketplaceList = JSON.parse(localStorage.getItem("marketplace"));
      // marketplaceList.push({
      //   id: v4(),
      //   name,
      //   description,
      //   ipfsUrl,
      //   minterId,
      //   mintId: id,
      //   rarity: values.rarity,
      //   price: +values.price,
      //   royalty: +values.royalty,
      //   topBid: +values.price,
      //   numSold: 0,
      //   buyersList: [],
      // });
      // localStorage.setItem("marketplace", JSON.stringify(marketplaceList));

      resetForm();
      exitPage();
    },
  });

  return (
    <div className="created__selling">
      <div className="created__selling__content">
        <div className="card-container">
          <Card
            id={id}
            image={ipfsUrl}
            title={name}
            tag={minterId}
            series={rarity}
          />
        </div>

        <div className="form-container">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-item">
              <label htmlFor="name">Price:</label>
              <input
                type="number"
                name="price"
                id="price"
                value={name}
                onChange={formik.handleChange}
              />
            </div>
          </form>
        </div>
      </div>

      <div className="btns-container">
        <Button
          type="submit"
          disabled={formik.isSubmitting}
          onClick={formik.submitForm}
        >
          SELL
        </Button>
        <button
          className="btn"
          type="reset"
          disabled={formik.isSubmitting}
          onClick={exitPage}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default Selling;
