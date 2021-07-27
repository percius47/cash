import React, { useState } from "react";
import "./styles.css";

//temporary object to store no. of notes
let notes = {
  1: "",
  5: "",
  10: "",
  20: "",
  100: "",
  500: "",
  2000: ""
};
let billAmt, cashGiven;

export default function App() {
  //state for no. of notes to store
  const [cashReturn, setCashReturn] = useState(notes);
  //array of the notes, digits gets stored in ascending order
  const notesArray = Object.keys(cashReturn).sort(function (a, b) {
    return b - a;
  });

  //state to display or hide cash given block
  const [cashGivenDiv, setCashGivenDiv] = useState("none");
  //state to display or hide error block
  const [errorDisplay, setErrorDisplay] = useState(["none", ""]);
  //state to display or hide output block
  const [outputDisplay, setOutputDisplay] = useState("none");
  //state to display or hide next button
  const [nextbtnDisplay, setNextbtnDisplay] = useState("block");

  //check btn handler function, will display error if invalid input, or will calculate no.of notes
  function checkBtnHandler() {
    if (cashGiven > 0 && billAmt > 0) {
      if (Number.isInteger(cashGiven)) {
        if (cashGiven >= billAmt) {
          if (cashGiven == billAmt) {
            setOutputDisplay("none");
            setErrorDisplay(["block", "No amount should be returned"]);
            return;
          }
          setErrorDisplay(["none", ""]);
          setOutputDisplay("block");
          calculateNotes(cashGiven, billAmt);
          return;
        } else {
          setOutputDisplay("none");
          setErrorDisplay([
            "block",
            "Cash is less than bill, please enter right amount"
          ]);
          return;
        }
      }
    } else {
      setOutputDisplay("none");
      setErrorDisplay([
        "block",
        "Enter valid bill amount and cash given to continue"
      ]);
    }
  }
  //function to find no.of notes
  function calculateNotes(cash, bill) {
    let diff = cash - bill;
    notesArray.map((note) => {
      let noteNo = Number(note);
      if (diff >= noteNo) {
        let count = Math.floor(diff / noteNo);
        diff = diff - noteNo * count;
        notes[noteNo] = count;
      } else {
        notes[noteNo] = "";
      }
    });
    setCashReturn(notes);
  }

  return (
    <div className="App">
      <h1>Cash Register Manager</h1>
      <p>
        Enter the bill amount and cash given by the customer and know minimum
        number of notes to return.
      </p>
      <div>
        <div className="label">Bill Amount:</div>
        <input
          className="inputBox"
          type="number"
          id="billAmt"
          onChange={(e) => {
            //store input value in variable
            billAmt = Number(e.target.value);
          }}
        />
        <button
          style={{ display: `${nextbtnDisplay}` }}
          className="nextBtn"
          onClick={() => {
            //function to display error if invalid input or display cash given block
            if (billAmt > 0) {
              setNextbtnDisplay("none");
              setErrorDisplay(["none", ""]);
              setCashGivenDiv("block");
            } else {
              setOutputDisplay("none");
              setErrorDisplay(["block", "Enter valid bill amount to continue"]);
            }
          }}
        >
          Next
        </button>
      </div>

      <div style={{ display: `${cashGivenDiv}` }}>
        <div className="label">Cash Given:</div>
        <input
          className="inputBox"
          id="cashGiven"
          onChange={(e) => {
            //store input value in variable
            cashGiven = Number(e.target.value);
          }}
        />
        <button className="checkBtn" onClick={checkBtnHandler}>
          Check
        </button>
      </div>

      {/* error block */}
      <div style={{ display: `${errorDisplay[0]}` }} className="errorMsg">
        {errorDisplay[1]}
      </div>

      {/* output block */}
      <div style={{ display: `${outputDisplay}` }} className="returnChange">
        <div className="label">Return Change:</div>
        <div id="output">
          <table>
            <tbody>
              <tr>
                <th>No.of Notes</th>
                {notesArray.map((note) => {
                  return (
                    <td className="noOfNotes" key={note}>
                      {cashReturn[note]}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <th>Note</th>
                {notesArray.map((note) => {
                  return <td key={note}>{note}</td>;
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
