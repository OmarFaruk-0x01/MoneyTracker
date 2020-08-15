import React, { useState } from "react";
import APStyle from "./Styles/AuthPage.module.css";

function AuthPage({ setUser, setLogin }) {
  const [userId, setuserId] = useState("");
  function setLocalStorage(id) {
    if (id) {
      localStorage.setItem("userName", id);
      setUser(userId);
      setLogin(true);
    }
  }

  return (
    <div className={APStyle.body}>
      <label htmlFor={"userId"}>
        <ion-icon name="wallet"></ion-icon>
        Money Tracker App
      </label>
      <input
        id={"userId"}
        value={userId}
        onChange={(e) => setuserId(e.target.value)}
        type={"text"}
        placeholder={"UserId"}
      />

      <button
        onClick={() => {
          setLocalStorage(userId);
        }}
      >
        <ion-icon style={{ fontSize: 20 }} name="log-in-outline"></ion-icon>
        LogIn
      </button>
    </div>
  );
}

export default AuthPage;
