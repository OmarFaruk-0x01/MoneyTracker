import React, { useContext } from "react";
import ReactDOM from "react-dom";
import MRStyle from "./Styles/ModalRoot.module.css";
import { Context } from "../ModalContext";

function ModalRoot(props) {
  const setModalOpen = useContext(Context);

  return ReactDOM.createPortal(
    <div datatype={props.type} className={MRStyle.main}>
      <ion-icon
        style={{ color: props.type === "inc" ? "teal" : "tomato" }}
        onClick={() => setModalOpen(false, "")}
        name="close"
      ></ion-icon>
      {props.children}
    </div>,
    document.getElementById("modal_root")
  );
}

export default ModalRoot;
