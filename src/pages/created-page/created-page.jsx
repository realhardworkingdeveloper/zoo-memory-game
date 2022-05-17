import React, { useState } from "react";
import CreatedList from "./created-list";

const CreatePage = () => {
  const [sellingPage, setSellingPage] = useState(false);
  const [sellingId, setSellingId] = useState("");

  return (
    <div className="create">
      {sellingPage && <></>}

      {!sellingPage && (
        <CreatedList
          setSellingPage={setSellingPage}
          setSellingId={setSellingId}
        />
      )}
    </div>
  );
};

export default CreatePage;
