import React, { useContext } from "react";

import TCCStyle from "./Styles/TransctionCardContainer.module.css";

import TransctionCard from "./TransctionCard";
import TransctionCardContainerHeader from "./TransctionCardContainerHeader";
import { Database } from "../firebase";
import { AuthContext } from "./AuthContext";

function removeHandle(userId, docId, transList, time, callBack) {
  const filtered = transList.filter(
    ({ date }) => date.toDate().toLocaleTimeString() !== time
  );
  Database.collection(userId)
    .doc(docId)
    .update({
      transction: filtered,
    })
    .then(() => {
      callBack(true);
    });
}

function TransctionCardContainer({ transctions, date, isUpdate }) {
  const d = date;
  const userId = useContext(AuthContext);
  return (
    <div className={TCCStyle.body}>
      <TransctionCardContainerHeader date={d} />
      {transctions.map(({ name, date, amount, type }) => (
        <TransctionCard
          key={date.toDate().toLocaleTimeString()}
          type={type}
          name={name}
          amount={amount}
          time={date.toDate().toLocaleTimeString()}
          removeCard={() =>
            removeHandle(
              userId,
              d,
              transctions,
              date.toDate().toLocaleTimeString(),
              isUpdate
            )
          }
        />
      ))}
    </div>
  );
}

export default TransctionCardContainer;
