import React from "react";
import CCStyle from "./Styles/CardContainer.module.css";
import TotalMoneyCard from "./TotalMoneyCard";
function CardContainer({ inc, exp, date }) {
  return (
    <div className={CCStyle.container}>
      <TotalMoneyCard date={date} amount={inc} type={"inc"} />
      <TotalMoneyCard date={date} amount={exp} type={"exp"} />
    </div>
  );
}

export default CardContainer;
