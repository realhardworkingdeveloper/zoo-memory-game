import { useFormik } from "formik";

import { useEffect, useState } from "react";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";

import { utils } from "near-api-js";
// import { v4 } from "uuid";
import Button from "../../components/button/button";
import useAccount from "../../store/account.store";

import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// const BN = require("bn.js");

const MintPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { accountId } = useAccount();

  useEffect(() => {
    // set up localStorage for our usage
    if (!localStorage.getItem("minted"))
      localStorage.setItem("minted", JSON.stringify([]));
  }, []);

  // const navigate = useNavigate();

  const form = useFormik({
    initialValues: {
      name: "",
      ipfsUrl: "",
      description: "",
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required").min(3).max(30),
      ipfsUrl: Yup.string().required("Image URL is required").url(),
      description: Yup.string().max("100"),
    }),

    onSubmit: async (values, { resetForm }) => {
      // TODO: Replace here with smart contract logic for minting NFT
      try {
        setIsProcessing(true);
        const get_current_token_number =
          await window.contract.get_current_token_number();
        console.log("current_token_number", get_current_token_number);
        const result = await window.contract.nft_mint(
          {
            token_id: `${get_current_token_number}`,
            token_metadata: {
              title: values.name,
              description: values.description,
              media: values.ipfsUrl,
              copies: 1,
            },
            receiver_id: accountId,
          },
          300000000000000, // attached GAS (optional)
          utils.format.parseNearAmount("0.1")
        );
        console.log("result", result);
        setIsProcessing(false);
        // after performing SC stuff
        resetForm();
        // navigate("../created");
      } catch (err) {
        console.log("minting err", err);
        setIsProcessing(false);
      }
    },
  });

  return (
    <BlockUi tag="div" blocking={isProcessing}>
      <div className="mint">
        <form className="mint__form" onSubmit={form.handleSubmit}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={form.values.name}
            onChange={form.handleChange}
          />
          <input
            type="text"
            name="ipfsUrl"
            id="ipfsUrl"
            placeholder="IPFS url"
            value={form.values.ipfsUrl}
            onChange={form.handleChange}
          />
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            rows={5}
            value={form.values.description}
            onChange={form.handleChange}
          />
          <div className="btn-container">
            <Button type="submit" disabled={form.isSubmitting}>
              MINT
            </Button>
          </div>
        </form>
      </div>
    </BlockUi>
  );
};

export default MintPage;
