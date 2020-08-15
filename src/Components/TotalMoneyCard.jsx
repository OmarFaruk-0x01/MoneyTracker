import React, { useContext } from "react";
import MCStyle from "./Styles/TotalMoneyCard.module.css";
import { Context } from "../ModalContext";
function TotalMoneyCard({ type, amount, date }) {
  let bodyStyle,
    pSpan,
    pBorder,
    od = "-",
    om = "-",
    td = "-",
    tm = "-";
  const allMonth = [
    "Jun",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  if (type === "inc") {
    bodyStyle = MCStyle.body_inc;
    pSpan = MCStyle.incSpan;
    pBorder = MCStyle.pBorder_inc;
  } else {
    bodyStyle = MCStyle.body_exp;
    pSpan = MCStyle.expSpan;
    pBorder = MCStyle.pBorder_exp;
  }
  const allData = useContext(Context);

  if (allData[0]) {
    [od, om] = allData[0].id.toString().split("-");
    const d = new Date();
    [td, tm] = [d.getDate(), d.getMonth(), d.getFullYear()];
  }
  return (
    <div className={`${MCStyle.body} ${bodyStyle}`}>
      <p className={`${pBorder}`}>
        Total{" "}
        <span className={`${pSpan}`}>
          {type === "inc" ? "Income" : "Expence"}
        </span>
      </p>
      <span className={MCStyle.tillDate}>
        {`${od} ${allMonth[om - 1]}` === `${td} ${allMonth[tm - 1]}`
          ? "Today"
          : ` ${od} ${allMonth[om - 1]} - ${td} ${allMonth[tm - 1]}`}
      </span>
      <h3
        className={MCStyle.totalAmount}
        style={{ color: type === "inc" ? "teal" : "tomato" }}
      >
        {amount > 0 ? amount : "--"}
      </h3>
    </div>
  );
}

export default TotalMoneyCard;
