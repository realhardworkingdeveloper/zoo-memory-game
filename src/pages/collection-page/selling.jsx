import { useFormik } from "formik";
import Button from "../../components/button/button";
import Card from "../../components/Card";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import useAccount from "../../store/account.store";
import { getAsDateTimeLocal } from "../../utils/date-time";
import BlockUi from "react-block-ui";
import { utils } from "near-api-js";

const Selling = ({ metadata, setSellingPage, token_id, owner_id }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { accountId, addCoins } = useAccount(); // TODO: not getting number of coins user owns?

  const timeNow = new Date(Date.now());
  const timeNowDateTimeLocal = getAsDateTimeLocal(timeNow);

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
      typeOfSale: "instant",
      startDate: getAsDateTimeLocal(new Date(Date.now())),
      endDate: getAsDateTimeLocal(new Date(Date.now() + 60 * 60 * 1000)),
    },
    validationSchema: Yup.object().shape({
      rarity: Yup.number()
        .required("Price is required")
        .moreThan(0)
        .lessThan(100000),
    }),

    validate(values) {
      const error = {};
      if (new Date(values.endDate) < new Date(values.startDate))
        error.endDate = "Date invalid";

      return error;
    },

    onSubmit: async (values, { resetForm }) => {
      // TODO: call SC to sell your NFT

      console.log("test");
      try {
        setIsProcessing(true);
        const result = await window.contract.create_auction(
          {
            auction_token: token_id,
            start_price:
              parseInt(utils.format.parseNearAmount(values.price.toString())) /
              10 ** 6,
            start_time: new Date(values.startDate).getTime(),
            end_time: new Date(values.endDate).getTime(),
            // TODO: Add variable for type of sale
          },
          300000000000000, // attached GAS (optional)
          utils.format.parseNearAmount("0.1")
        );
        console.log("result", result);
        setIsProcessing(false);
        // after performing SC stuff
        resetForm();
        exitPage();
      } catch (err) {
        console.log("listing err", err);
        alert("Something went wrong trying to sell: " + err.message);
        setIsProcessing(false);
      }
    },
  });

  return (
    <BlockUi tag="div" blocking={isProcessing}>
      <div className="created__selling">
        <div className="created__selling__content">
          <div className="card-container">
            <Card
              id={token_id}
              image={metadata.media}
              title={metadata.title}
              tag={owner_id}
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
                  value={formik.values.price}
                  onChange={formik.handleChange}
                />
              </div>

              {/* type of sale */}
              <div className="form-item">
                <label htmlFor="rarity">Type of Sale</label>
                <select
                  id="typeOfSale"
                  name="typeOfSale"
                  value={formik.values.typeOfSale}
                  onChange={formik.handleChange}
                >
                  <option value="instant">Instant Sale</option>
                  <option value="bidding">Bidding</option>
                </select>
              </div>

              {/* Date and Times */}
              {formik.values.typeOfSale === "bidding" && (
                <div className="form-item">
                  <label htmlFor="startDate">Start Date:</label>
                  <input
                    type="datetime-local"
                    id="startDate"
                    name="startDate"
                    min={timeNowDateTimeLocal}
                    value={formik.values.startDate}
                    onChange={formik.handleChange}
                  />
                </div>
              )}
              {formik.values.typeOfSale === "bidding" && (
                <div className="form-item">
                  <label htmlFor="startDate">End Date:</label>
                  <input
                    type="datetime-local"
                    id="endDate"
                    name="endDate"
                    min={timeNowDateTimeLocal}
                    value={formik.values.endDate}
                    onChange={formik.handleChange}
                  />
                </div>
              )}
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
    </BlockUi>
  );
};

export default Selling;
