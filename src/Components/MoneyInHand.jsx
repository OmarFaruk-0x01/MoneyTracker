import React from "react";
import MIHStyle from "./Styles/MoneyInHand.module.css";
function MoneyInHand({ amount, inc, exp }) {
  return (
    <div
      className={MIHStyle.body}
      style={{
        borderColor: inc >= exp ? "teal" : "tomato",
        color: "white",
      }}
    >
      <h4 className={MIHStyle.text}>Money In Hand</h4>
      <h4
        className={MIHStyle.moneyText}
        style={{
          color: inc >= exp ? "teal" : "tomato",
        }}
      >
        {amount !== 0 ? amount : "--"}
      </h4>
    </div>
  );
}

export default MoneyInHand;
