import React, { useState } from "react";
import "./App.css";

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
 // const [cashGivenDiv, setCashGivenDiv] = useState("block");
  //state to display or hide error block
  const [errorDisplay, setErrorDisplay] = useState(["none", ""]);
  //state to display or hide output block
  const [outputDisplay, setOutputDisplay] = useState("none");
  //state to display or hide next button
  //const [nextbtnDisplay, setNextbtnDisplay] = useState("block");

  //check btn handler function, will display error if invalid input, or will calculate no.of notes
  function checkBtnHandler() {
    if (cashGiven > 0 && billAmt > 0) {
      if (Number.isInteger(cashGiven)) {
        if (cashGiven >= billAmt) {
          if (cashGiven === billAmt) {
            setOutputDisplay("none");
            setErrorDisplay(["block", "No Change Due! Visit Again!"]);
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
    return 0;
  }

  return (

    <div className="App">
      <div className="nav">
      <h1>Cash Register</h1>
      </div>
      <div className="content">
      

      <div className="about">
      <p>
        Enter the bill amount and cash given by the customer and know minimum
        number of notes to return.
      </p>
      </div>
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
    
      </div>

      <div 
      //style={{ display: `${cashGivenDiv}` }}
      >
        <div className="label">Cash Tendered:</div>
        <input
        type="number"
          className="inputBox"
          id="cashGiven"
          onChange={(e) => {
            //store input value in variable
            cashGiven = Number(e.target.value);
          }}
        />
        <button className="checkBtn" onClick={()=>{
          
          console.log(billAmt,cashGiven);
            //function to display error if invalid input or display cash given block
            if (billAmt > 0 && cashGiven>0) {
              //setNextbtnDisplay("none");
              setErrorDisplay(["none", ""]);
             // setCashGivenDiv("block");
              checkBtnHandler();
            } 
            else {
              setOutputDisplay("none");
              setErrorDisplay(["block", "Enter valid bill amount to continue"]);
            }
          
          }
        }
          >
          Calculate
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
          
              
              
                {notesArray.map((note) => {
                 
                 if(cashReturn[note]>0)
                    {
                 return (
                   <div className="listParent"> 
                   <span
                  className="Notes" 
                   key={note}>
                      ₹{note}: 
                    </span>
                    <span className="noNotes">
                    {cashReturn[note]}
                    </span>
                    </div>
                  );
                }//if
                })}
              
            
             
               
            
           
        </div>
        {/* Output */}
      </div>
      </div>
      <div className="footer">
                <small>Made with React.💸</small>
                </div>
    </div>
  );
}
