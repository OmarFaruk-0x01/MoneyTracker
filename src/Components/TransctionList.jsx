import React from "react";
import TLStyle from "./Styles/TransctionList.module.css";
import TransctionCardContainer from "./TransctionCardContainer";
import Loader from "./Loader";

function TransctionList({ data, isLoded, isData, isUpdate }) {
  return (
    <div className={TLStyle.body}>
      {!isLoded ? (
        <div className={TLStyle.loaderDiv}>
          <Loader />
        </div>
      ) : isData ? (
        data.map(({ id, transction }, i) => (
          <TransctionCardContainer
            isUpdate={isUpdate}
            key={i}
            transctions={transction}
            date={id}
          />
        ))
      ) : (
        <div className={TLStyle.loaderDiv}>
          <p>No Data Avaiable</p>
        </div>
      )}
    </div>
  );
}

export default TransctionList;
