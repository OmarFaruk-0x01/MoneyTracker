import React, { useState, useContext } from "react";
import IIStyle from "./Styles/InputIncomes.module.css";
import { Database } from "../firebase";
import { Context } from "../ModalContext";
import Loader from "./Loader";
import { AuthContext } from "./AuthContext";

function findTrans(data, id) {
  let newA = [];
  data.forEach((doc) => {
    if (doc.id === id) {
      newA = doc.transction;
    }
  });

  return newA;
}

function InputIncomes({ type, allData, isUpdate }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const setModalOpen = useContext(Context);
  const userName = useContext(AuthContext);
  function addTrans() {
    if (!name && !amount) {
      return;
    }
    setLoading(true);
    const date = new Date();
    const [d, m, y] = [date.getDate(), date.getMonth(), date.getFullYear()];
    const docID = `${d}-${m}-${y}`;
    // const docID = `14-7-2020`;

    Database.collection(userName)
      .doc(docID)
      .set({
        transction: [
          ...findTrans(allData, docID),
          {
            type: type,
            name: name,
            amount: amount,
            date: new Date(),
          },
        ],
      })
      .then(() => {
        setAmount(0);
        setName("");
        setLoading(false);
        setModalOpen(false);
        isUpdate(true);
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className={`${IIStyle.main}`}>
      <input
        datatype={type}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder={"Name"}
      />
      <input
        datatype={type}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
        placeholder={"Amount"}
      />
      <button
        onClick={() => addTrans()}
        datatype={`${type}Btn`}
        type={"submit"}
      >
        {loading ? <Loader /> : "Add"}
      </button>
    </div>
  );
}

export default InputIncomes;
