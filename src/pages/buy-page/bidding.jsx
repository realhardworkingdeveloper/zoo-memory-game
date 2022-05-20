import { useFormik } from "formik";
import React from "react";
import BlockUi from "react-block-ui";
import { utils } from "near-api-js";
import Card from "../../components/Card";
import * as Yup from "yup";
import Big from "big.js";
import Button from "../../components/button/button";

const Bidding = ({ setBidding, ...biddingNft }) => {
  const exitPage = () => {
    setBidding(false);
  };

  const formik = useFormik({
    initialValues: {
      price: "",
    },
    validationSchema: Yup.object().shape({
      price: Yup.number()
        .required("Price is required")
        .moreThan(
          utils.format.formatNearAmount(
            Big(1).times(biddingNft.current_price).toFixed()
          ),
          "Bid has to be more than current bid"
        ),
    }),

    onSubmit: async (values, { resetForm }) => {
      // TODO: call SC to place bid on NFT

      resetForm();
      exitPage();
    },
  });

  return (
    <BlockUi tag="div">
      <div className="created__selling">
        <div className="created__selling__content">
          <div className="card-container">
            <Card
              id={biddingNft.tokenData.token_id}
              image={biddingNft.tokenData.metadata.media}
              title={biddingNft.tokenData.metadata.title}
              tag={biddingNft.owner}
            // series={rarity}
            />
          </div>

          <div className="form-container">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-item">
                <label htmlFor="price">Bid amount:</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={formik.price}
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
            BID
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
    </BlockUi>
  );
};

export default Bidding;
