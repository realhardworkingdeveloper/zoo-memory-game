import { useFormik } from "formik";
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import Button from "../../components/button/button";
import Card from "../../components/Card";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { utils } from "near-api-js";
import BN from "bn.js";

const Selling = ({
  token_id,
  owner_id,
  metadata,
  setSellingPage,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const exitPage = () => {
    setSellingPage(false);
  };

  const formik = useFormik({
    initialValues: {
      rarity: "COMMON",
      price: "",
      // royalty: "",
    },
    validationSchema: Yup.object().shape({
      rarity: Yup.string().required("Rarity is required"),
      price: Yup.number()
        .required("Price is required")
        .moreThan(0)
        .lessThan(1000000),
      // royalty: Yup.number()
      //   .required("Royalty is required")
      //   .moreThan(0)
      //   .lessThan(100),
    }),

    onSubmit: async (values, { resetForm }) => {
      console.log("test")
      try {
        setIsProcessing(true)
        const result = await window.contract.create_auction(
          {
            auction_token: token_id,
            start_price: parseInt(utils.format.parseNearAmount(values.price.toString())) / 10 ** 6,
            start_time: 1652943424,
            end_time: 1653029824
          },
          300000000000000, // attached GAS (optional)
          utils.format.parseNearAmount("0.1")
        );
        console.log("result", result)
        setIsProcessing(false)
        // after performing SC stuff
        resetForm();
        exitPage();
      } catch (err) {
        console.log("listing err", err)
        setIsProcessing(false)
      }
    },
  });

  return (
    <BlockUi tag="div" blocking={isProcessing}>
      <div className="created__selling">
        <div className="created__selling__content">
          <div className="card-container">
            <Card id={token_id} image={metadata.media} title={metadata.title} tag={owner_id} />
          </div>

          <div className="form-container">
            <form onSubmit={formik.handleSubmit}>
              {/* Name */}
              <div className="form-item">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="no-border full-width"
                  disabled
                  value={metadata.title}
                />
              </div>
              {/* Description */}
              <div className="form-item">
                <label htmlFor="description">Description:</label>
                <textarea
                  name="description"
                  id="description"
                  className="no-border full-width"
                  disabled
                  value={metadata.description}
                />
              </div>

              {/* rarity => dropdown */}
              <div className="form-item">
                <label htmlFor="rarity">Rarity</label>
                <select
                  id="rarity"
                  name="rarity"
                  value={formik.values.rarity}
                  onChange={formik.handleChange}
                >
                  <option value="common">COMMON</option>
                  <option value="uncommon">UNCOMMON</option>
                  <option value="rare">RARE</option>
                  <option value="epic">EPIC</option>
                  <option value="mythical">MYTHICAL</option>
                </select>
              </div>

              {/* price */}
              <div className="form-item">
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                />
              </div>

              {/* royalty in percent */}
              {/* <div className="form-item">
              <label htmlFor="royalty">Royalty:</label>
              <input
                type="number"
                name="royalty"
                id="royalty"
                value={formik.values.royalty}
                onChange={formik.handleChange}
              />
            </div> */}
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
          {/* <Button type="reset" disabled={formik.isSubmitting} onClick={exitPage}>
          CANCEL
        </Button> */}
          <button className="btn" type="reset" disabled={formik.isSubmitting} onClick={exitPage}>
            CANCEL
          </button>
        </div>
      </div>
    </BlockUi>
  );
};

export default Selling;
