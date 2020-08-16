import React, { useContext } from "react";
import HStyle from "./Styles/Header.module.css";
import { AuthContext } from "./AuthContext";
function Header({ logout }) {
  const userName = useContext(AuthContext);
  return (
    <div className={HStyle.body}>
      <span>
        <ion-icon
          style={{ fontSize: 20 }}
          name="person-circle-outline"
        ></ion-icon>
        {userName}
      </span>
      <span onClick={logout}>
        LogOut
        <ion-icon style={{ fontSize: 20 }} name="log-out-outline"></ion-icon>
      </span>
    </div>
  );
}

export default React.memo(Header);
