import React, { useContext } from "react";
import ABStyles from "./Styles/AddBtns.module.css";
import { Context } from "../ModalContext";
function AddBtns({ type }) {
  const setModalOpen = useContext(Context);
  return (
    <input
      type={"submit"}
      onClick={() => setModalOpen(true, type)}
      value={type === "inc" ? "Income" : "Expenes"}
      className={`${ABStyles.body} ${
        type === "inc" ? ABStyles.body_inc : ABStyles.body_exp
      }`}
    />
  );
}

export default React.memo(AddBtns);
