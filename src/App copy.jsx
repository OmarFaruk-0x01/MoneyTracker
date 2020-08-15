import React, { useState, useEffect } from "react";
import "./App.css";
import MoneyInHand from "./Components/MoneyInHand";
import CardContainer from "./Components/CardContainer";
import TransctionList from "./Components/TransctionList";
import BtnContainer from "./Components/BtnContainer";
import AuthPage from "./Components/AuthPage";
import ModalRoot from "./Components/ModalRoot";
import { Modalprovider } from "./ModalContext";
import InputIncomes from "./Components/InputIncomes";
import { Database } from "./firebase";

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
  const [userName, setuserName] = useState("");
  useEffect(() => {
    const unsubscriber = Database.onSnapshot((snapshot) => {
      let newArray = [];
      if (!snapshot.empty) {
        snapshot.docs.forEach((doc) => {
          if (doc.data().transction.length > 0) {
            newArray.push({ id: doc.id, ...doc.data() });
          } else {
            Database.doc(doc.id)
              .delete()
              .then(() => {});
          }
        });
        setAllData(newArray);
        setLoded(true);
        setIsData(true);
      } else {
        setLoded(true);
        setIsData(false);
      }
    });
    return () => unsubscriber();
  }, [isData, isLoded]);

  useEffect(() => {
    const { inc, exp, hand } = updateIncome(allData);
    setExpamount(exp);
    setIncamount(inc);
    setHandamount(hand);
    setIsUpdate(false);
  }, [allData, isUpdate]);

  function modalUdate(isOpen, type) {
    setModalOpen(isOpen);
    setModalChildType(type);
  }

  return (
    <div className={"app"}>
      {!isLogin ? (
        <AuthPage />
      ) : (
        <>
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
    </div>
  );
}

export default App;
