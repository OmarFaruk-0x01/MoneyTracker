import React from "react";
import TCCHStyle from "./Styles/TransctionCardContainerHeader.module.css";
function TransctionCardContainerHeader({ date }) {
  return <p className={`${TCCHStyle.main}`}>{date}</p>;
}

export default TransctionCardContainerHeader;
