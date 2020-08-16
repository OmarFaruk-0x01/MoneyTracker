import React from "react";
import TCStyle from "./Styles/TransctionCard.module.css";

function TransctionCard({ type, name, time, amount, removeCard }) {
  let main_border_color, amount_color, amount_icon;
  if (type === "inc") {
    main_border_color = TCStyle.inc_main;
    amount_color = "teal";
    amount_icon = "caret-up-outline";
  } else {
    main_border_color = TCStyle.exp_main;
    amount_color = "tomato";
    amount_icon = "caret-down-outline";
  }
  return (
    <div className={`${TCStyle.main} ${main_border_color}`}>
      <div className={TCStyle.main_left}>
        <span>{time}</span>
        <p>{name}</p>
      </div>
      <div className={TCStyle.main_right} style={{ color: amount_color }}>
        <ion-icon name={`${amount_icon}`}></ion-icon>
        <p>{amount}</p>
        <span>BDT</span>
      </div>
      <span onClick={removeCard}>
        <ion-icon name="trash-outline"></ion-icon>
      </span>
    </div>
  );
}

export default React.memo(TransctionCard);
