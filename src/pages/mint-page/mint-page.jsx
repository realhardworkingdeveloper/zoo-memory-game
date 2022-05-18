import { useFormik } from "formik";
import { useEffect } from "react";
import { v4 } from "uuid";
import Button from "../../components/button/button";
import useAccount from "../../store/account.store";

import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const MintPage = () => {
  const { accountId } = useAccount();

  useEffect(() => {
    // set up localStorage for our usage
    if (!localStorage.getItem("minted"))
      localStorage.setItem("minted", JSON.stringify([]));
  }, []);

  const navigate = useNavigate();

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

      const nftList = JSON.parse(localStorage.getItem("minted"));
      nftList.push({ ...values, id: v4(), minterId: accountId });
      localStorage.setItem("minted", JSON.stringify(nftList));

      // after performing SC stuff
      resetForm();
      navigate("../created");
    },
  });

  return (
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
  );
};

export default MintPage;
