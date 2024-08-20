import React from "react";
import { useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useContext } from "react";

export const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    if (text.trim() === "" || amount === 0) {
      alert("Please enter a valid text and amount");
      return;
    }

    const newTransaction = {
      //id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount,
    };
    addTransaction(newTransaction);
  };

  return (
    <>
      <h3>Add new transaction!</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Expense</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (put '-' for expense, and '+' for income)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};
