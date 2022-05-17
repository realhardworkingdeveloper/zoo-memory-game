import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import useAccount from "../../store/account.store";

const MintPage = () => {
  const { accountId } = useAccount();

  useEffect(() => {
    // set up localStorage for our usage
    if (!localStorage.getItem("minted"))
      localStorage.setItem("minted", JSON.stringify([]));
  }, []);

  const form = useFormik({
    initialValues: {
      name: "",
      ipfsUrl: "",
      description: "",
    },
    onSubmit: async (values, { resetForm }) => {
      // TODO: Replace here with smart contract logic for minting NFT

      const nftList = JSON.parse(localStorage.getItem("minted"));
      nftList.push({ ...values, id: v4(), minterId: accountId });
      localStorage.setItem("minted", JSON.stringify(nftList));

      // after performing SC stuff
      resetForm();
    },
  });

  return (
    <div className="mint">
      <form className="mint__form" onSubmit={form.submitForm}>
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
          placeholder="IPFS Url"
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
          <button type="submit" disabled={form.isSubmitting}>
            MINT
          </button>
        </div>
      </form>
    </div>
  );
};

export default MintPage;
