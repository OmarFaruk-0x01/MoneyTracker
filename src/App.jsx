import React, { useState, useEffect } from "react";
import "./App.css";
import MoneyInHand from "./Components/MoneyInHand";
import CardContainer from "./Components/CardContainer";
// import TransctionList from "./Components/TransctionList";
import BtnContainer from "./Components/BtnContainer";
import AuthPage from "./Components/AuthPage";
import ModalRoot from "./Components/ModalRoot";
import { Modalprovider } from "./ModalContext";
import { AuthContext } from "./Components/AuthContext";
import InputIncomes from "./Components/InputIncomes";
import { Database } from "./firebase";
import Header from "./Components/Header";
// import { loadable } from '@loadable/component';
import loadable from "@loadable/component";

const TransctionList = loadable(() => import("./Components/TransctionList"));
function updateIncome(allData) {
  let inc = 0;
  let exp = 0;
  allData.forEach(({ transction }) => {
    transction.forEach(({ amount, type }) => {
      if (type === "inc") {
        inc += parseInt(amount);
      } else {
        exp += parseInt(amount);
      }
    });
  });

  return {
    inc: inc,
    exp: exp,
    hand: inc - exp,
  };
}

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalChildType, setModalChildType] = useState("");
  const [allData, setAllData] = useState([]);
  const [isLoded, setLoded] = useState(false);
  const [isData, setIsData] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [incAmount, setIncamount] = useState(0);
  const [expAmount, setExpamount] = useState(0);
  const [HandAmount, setHandamount] = useState(0);
  const [isLogin, setLogin] = useState(false);
  const [userName, setuserName] = useState("guest");

  useEffect(() => {
    console.log("u", userName);
    const unsubscriber = Database.collection(userName).onSnapshot(
      (snapshot) => {
        let newArray = [];
        if (!snapshot.empty) {
          snapshot.docs.forEach((doc) => {
            if (doc.data().transction.length > 0) {
              newArray.push({ id: doc.id, ...doc.data() });
            } else {
              console.log("Try Delte");
              Database.collection(userName).doc(doc.id).delete();
            }
          });
          setAllData(newArray);
          setLoded(true);
          setIsData(true);
        } else {
          setLoded(true);
          setIsData(false);
        }
      }
    );
    return () => unsubscriber();
  }, [userName, isLogin]);

  useEffect(() => {
    const username = localStorage.getItem("userName");
    if (username) {
      setuserName(username);
      setLogin(true);
    }
  }, []);

  useEffect(() => {
    const { inc, exp, hand } = updateIncome(allData);
    setExpamount(exp);
    setIncamount(inc);
    setHandamount(hand);
    setIsUpdate(false);
  }, [allData, isUpdate, isLogin, userName]);

  function modalUdate(isOpen, type) {
    setModalOpen(isOpen);
    setModalChildType(type);
  }

  function logOutResets() {
    setAllData([]);
    setExpamount(0);
    setHandamount(0);
    setIncamount(0);
    setLogin(false);
    setuserName("guest");
    localStorage.removeItem("userName");
  }

  return (
    <div className={"app"}>
      <AuthContext.Provider value={userName}>
        {!isLogin ? (
          <AuthPage setUser={setuserName} setLogin={setLogin} />
        ) : (
          <>
            <Header
              logout={logOutResets}
              setUser={setuserName}
              setLogin={setLogin}
            />
            <MoneyInHand inc={incAmount} exp={expAmount} amount={HandAmount} />
            <Modalprovider value={allData}>
              <CardContainer inc={incAmount} exp={expAmount} />
            </Modalprovider>
            <TransctionList
              isUpdate={setIsUpdate}
              data={allData}
              isLoded={isLoded}
              isData={isData}
            />
            <Modalprovider value={modalUdate}>
              <BtnContainer />
              {isModalOpen ? (
                <ModalRoot type={modalChildType}>
                  <InputIncomes
                    isUpdate={setIsUpdate}
                    allData={allData}
                    type={modalChildType}
                  />
                </ModalRoot>
              ) : null}
            </Modalprovider>
          </>
        )}
      </AuthContext.Provider>
    </div>
  );
}

export default App;
