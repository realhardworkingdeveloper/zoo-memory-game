import { useFormik } from "formik";
import Button from "../../components/button/button";
import Card from "../../components/Card";
import * as Yup from "yup";
import { useEffect } from "react";
import { v4 } from "uuid";

const Selling = ({
  id,
  name,
  ipfsUrl,
  minterId,
  description,
  setSellingPage,
}) => {
  useEffect(() => {
    if (!localStorage.getItem("marketplace"))
      localStorage.setItem("marketplace", JSON.stringify([]));
  }, []);

  const exitPage = () => {
    setSellingPage(false);
  };

  const formik = useFormik({
    initialValues: {
      rarity: "COMMON",
      price: "",
      royalty: "",
    },
    validationSchema: Yup.object().shape({
      rarity: Yup.string().required("Rarity is required"),
      price: Yup.number()
        .required("Price is required")
        .moreThan(0)
        .lessThan(1000000),
      royalty: Yup.number()
        .required("Royalty is required")
        .moreThan(0)
        .lessThan(100),
    }),

    onSubmit: async (values, { resetForm }) => {
      // TODO: call SC to sell a minted NFT to marketplace, using localStorage as dummy data

      const marketplaceList = JSON.parse(localStorage.getItem("marketplace"));
      marketplaceList.push({
        id: v4(),
        name,
        description,
        ipfsUrl,
        minterId,
        mintId: id,
        rarity: values.rarity,
        price: +values.price,
        royalty: +values.royalty,
        topBid: +values.price,
        numSold: 0,
        buyersList: [],
      });
      localStorage.setItem("marketplace", JSON.stringify(marketplaceList));

      resetForm();
      exitPage();
    },
  });

  return (
    <div className="created__selling">
      <div className="created__selling__content">
        <div className="card-container">
          <Card id={id} image={ipfsUrl} title={name} tag={minterId} />
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
                value={name}
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
                value={description}
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
            <div className="form-item">
              <label htmlFor="royalty">Royalty:</label>
              <input
                type="number"
                name="royalty"
                id="royalty"
                value={formik.values.royalty}
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
        {/* <Button type="reset" disabled={formik.isSubmitting} onClick={exitPage}>
          CANCEL
        </Button> */}
        <button className="btn" type="reset" disabled={formik.isSubmitting} onClick={exitPage}>
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default Selling;
