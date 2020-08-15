import React, { Suspense } from "react";
import loadable from "@loadable/component";
import TLStyle from "./Styles/TransctionList.module.css";
// import TransctionCardContainer from "./TransctionCardContainer";
import Loader from "./Loader";

const TransctionCardContainer = loadable(() =>
  import("./TransctionCardContainer")
);
function TransctionList({ data, isLoded, isData, isUpdate }) {
  return (
    <div className={TLStyle.body}>
      <Suspense fallback={<Loader />}>
        {isData ? (
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
      </Suspense>
    </div>
  );
}

export default TransctionList;
