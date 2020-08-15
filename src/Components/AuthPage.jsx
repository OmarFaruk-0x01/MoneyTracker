import React, { useState } from "react";
import APStyle from "./Styles/AuthPage.module.css";

function setLocalStorage(id, callback) {
  if (id) {
    localStorage.setItem("userName", id);
  }
}

function AuthPage({ setUser, setLogin }) {
  const [userId, setuserId] = useState("");
  return (
    <div className={APStyle.body}>
      <h2>Money Tracker App</h2>
      <input
        value={userId}
        onChange={(e) => setuserId(e.target.value)}
        type={"text"}
        placeholder={"UserId"}
      />

      <button
        onClick={() => {
          setLocalStorage(userId);
          setUser(userId);
          setLogin(true);
        }}
      >
        <ion-icon style={{ fontSize: 20 }} name="log-in-outline"></ion-icon>
        LogIn
      </button>
    </div>
  );
}

export default AuthPage;
