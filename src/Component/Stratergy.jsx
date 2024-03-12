import React, { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import Navbar from "./Navbar";
import Timer from "./Timer";
import { useNavigate } from "react-router";

const Stratergy = (props) => {
  let {setactive}=props
  let navigate=useNavigate()
  let [modalshow,setmodal]=useState(false)
  let {setdata}=props
  let [date, setdate] = useState(new Date());
  let [time, setime] = useState(date.getTime());
  let [targetcheck, settargetcheck] = useState(false);
  let [sellcheck, setsellcheck] = useState(false);
  let [waitcheck, setwaitcheck] = useState(false);
  let [EntryTime, setentrytime] = useState("09:30:00");
  let [exittime, setexittime] = useState("15:00:00");
  
  let [arryleg, setarryleg] = useState([]);
   useEffect(()=>{
    setactive("strategy")
   },[])
   let company=[
    'Suntv','TataChem','UPL','Tatapower'
   ]
  let [leg, setleg] = useState({
    name:"",
    mtm: "none",
    slreentry: 0,
    instrument: "nifty",
    segments: "OPT",
    position: "buy",
    optiontype: "ce",
    strikecriteria: "atm",
    striketype: "",
    targetpercentage: "TP",
    sellpercentage: "SP",
    targetvalue: null,
    sellvalue: null,
    closet: 0,
    totallot: 1,
    extralegs:arryleg,
  });
  let daysarry=["Monday","Tuesday","Wednesday","Thursday","Friday"]
  
  let [selecteddays,setselecteddays]=useState([...daysarry])
  let handlechange = (e) => {
    let { name, value } = e.target;
    if (name === "totallot" && !isNaN(Number(value))) {
      if (Number(value) < 0) value = 1;
      else if (Number(value) > 60) value = 60;
      else value = Number(value);
    }
    setleg((prevleg) => ({
      ...prevleg,
      [name]: value,
    }));
  };
  let handlearrychange = (e, id) => {
    let { name, value } = e.target;
    if (name === "totallot" && !isNaN(Number(value))) {
      if (Number(value) < 1) value = 1;
      else if (Number(value) > 60) value = 60;
      else value = Number(value);
    }
    if (name == "targetvalue" && !isNaN(Number(value))) {
      if (Number(value) < 0) value = 0;
      else value = Number(value);
    }
    if (name == "sellvalue" && !isNaN(Number(value))) {
      if (Number(value) < 0) value = 0;
      else value = Number(value);
    }
    if (name === "position" && value == "buy") value = "sell";
    else if (name == "position" && value == "sell") value = "buy";
    if (name == "optiontype" && value == "ce") value = "pe";
    else if (name == "optiontype" && value == "pe") value = "ce";
    if (name == "closet" && value < 0) value = 0;
    setarryleg((prevLegs) =>
      prevLegs.map((prevLeg) =>
        prevLeg.id === id ? { ...prevLeg, [name]: value } : prevLeg
      )
    );
  };
  

  return (
    <div className="min-h-[100vh]">
      <div className="min-h-[8vh] sticky-top bg-white items-center justify-between px-5 flex flex-col flex-sm-row border-2">
        <p className="mb-0">Create Strategy </p>
        <div>
          <p className="mb-0"> <Timer/> </p>
        </div>
      </div>
      {/* Strategy name  */}
      <div className="row  mx-auto  my-2 my-sm-1 ">
        <div className="col-sm-6 my-3 my-sm-2">
          <p className="fs14 fw-semibold text-lg">Strategy Name </p>
          <input
            type="text" name="name" value={leg.name} onChange={handlechange}
            className="p-2 rounded lg:w-3/6 focus-within:outline-none border-slate-400 px-3 border-1"
            placeholder="eg : Straddle"
          />
        </div>
       
{/* Time Entry and exit here */}
        <hr />
      </div>

      {/* Add Leg */}
      <div className="py-3 py-sm-1 fs14 container">
        <p className="fw-semibold text-lg ">Add Leg</p>
        <section className="flex   mb-4 gap-3 justify-between items-center flex-wrap ">
          <div className="">
            {/* Instrument */}
            Company / Index
            <select
              onChange={handlechange}
              value={leg.instrument}
              className="block fs14 shadow my-2 outline-none border-1 border-slate-400 rounded p-1 "
              name="instrument"
              id="instrument"
            >
              {company.map((value)=>{
                return(
<option value={`${value}`}>{value} </option>
                )
              })}
              
            </select>
          </div>
          {/* Segment */}
          <div className="">
            Segments
            <div className="my-2 shadow">
              <button
                name="segments"
                value="OPT"
                onClick={handlechange}
                className={`p-1 px-3  transition duration-500 rounded outline-none ${
                  leg.segments == "OPT"
                    ? "bg-blue-50 border-1  border-blue-600 text-blue-600"
                    : ""
                }`}
              >
                OPT
              </button>
              <button
                name="segments"
                value="FUT"
                onClick={handlechange}
                className={`p-1 px-3 transition duration-500 rounded outline-none  ${
                  leg.segments == "FUT"
                    ? "bg-blue-50 border-1  border-blue-600 text-blue-600"
                    : ""
                }`}
              >
                FUT
              </button>
            </div>
          </div>
          {/* Position */}
         
          {/* Option type */}
          <div className={` ${leg.segments === "FUT" ? "d-none" : ""} `}>
            Option Type
            <div className="my-2 shadow">
              <button
                name="optiontype"
                value="ce"
                onClick={handlechange}
                className={`p-1 px-4  transition duration-500 rounded outline-none ${
                  leg.optiontype == "ce"
                    ? "bg-blue-50 border-1  border-blue-600 text-blue-600"
                    : ""
                }`}
              >
                CE
              </button>
              <button
                name="optiontype"
                value="pe"
                onClick={handlechange}
                className={`p-1 px-4 transition duration-500 rounded outline-none  ${
                  leg.optiontype == "pe"
                    ? "bg-blue-50 border-1  border-blue-600 text-blue-600"
                    : ""
                }`}
              >
                PE
              </button>
            </div>
          </div>
          {/* Strike Cireteria */}
          <div className={`${leg.segments === "FUT" ? "d-none" : ""}`}>
            Strike Price
            <input type="number" className="d-block numberwithoutspin p-2 px-3 border-1 outline-none shadow rounded my-1 w-32  " />
            {/* <select
              name="strikecriteria"
              value={leg.strikecriteria}
              onChange={handlechange}
              className="block fs14 shadow my-2 outline-none border-1 border-slate-400 rounded p-1 "
            >
              <option value="atm">ATM type</option>
              <option value="closet">Closet Premium</option>
            </select> */}
          </div>
          <div className={`${leg.segments === "FUT" ? "d-none" : ""}`}>
            Entry Price
            <input type="number" className="d-block numberwithoutspin p-2 px-3 border-1 outline-none shadow rounded my-1 w-32  " />
            {/* <select
              name="strikecriteria"
              value={leg.strikecriteria}
              onChange={handlechange}
              className="block fs14 shadow my-2 outline-none border-1 border-slate-400 rounded p-1 "
            >
              <option value="atm">ATM type</option>
              <option value="closet">Closet Premium</option>
            </select> */}
          </div>
          {/* Strike Type */}
          {/* <div className={`${leg.segments === "FUT" ? "d-none" : ""} `}>
            {leg.strikecriteria == "atm" ? "Strike Type" : "Closet Premium"}
            <select
              name="striketype"
              className={`block fs14 shadow ${
                leg.strikecriteria === "atm" ? "" : "d-none"
              }   my-2 outline-none border-1 border-slate-400 rounded p-1 `}
            >
              <option value="ATM">ATM</option>
              <option value="ATM">ATM</option>
            </select>
            <input
              type="number"
              value={leg.closet}
              name="closet"
              onChange={handlechange}
              className={`${
                leg.strikecriteria === "closet" ? "d-block" : "d-none"
              }  w-24
                border-1  my-2 fs14 shadow border-slate-400 px-2 p-1  outline-none rounded `}
            />
          </div> */}
          {/* Total lot */}
          <div className="">
            Total lot
            <input
              type="number"
              value={leg.totallot}
              name="totallot"
              onChange={handlechange}
              className={`block w-14
                border-1  my-2 fs14 shadow border-slate-400 px-2 p-1  outline-none rounded `}
            />
          </div>
          {/* Position */}
          <div className="">
            Position
            <div className="my-2 shadow">
              <button
                name="position"
                value="buy"
                onClick={handlechange}
                className={`p-1 px-3  transition duration-500 rounded outline-none  ${
                  leg.position == "buy"
                    ? "bg-blue-50  border-1 border-green-600 "
                    : ""
                } text-green-600`}
              >
                BUY
              </button>
              <button
                name="position"
                value="sell"
                onClick={handlechange}
                className={`p-1 px-3 transition duration-500 rounded outline-none text-red-600  ${
                  leg.position == "sell"
                    ? "bg-red-50 border-1  border-red-600 "
                    : ""
                }`}
              >
                SELL
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              if (arryleg.length > 0)
                setarryleg((prev) => {
                  return [
                    ...prev,
                    { ...leg, id: prev[prev.length - 1].id + 1 },
                  ];
                });
              else
                setarryleg((prev) => {
                  return [...prev, { ...leg, id: 1 }];
                });
            }}
            className="p-2 h-fit px-3 bg-blue-500 hover:bg-blue-600 text-white rounded "
          >
            Add Leg
          </button>
        </section>

        <hr className="" />
      </div>
      {/* Legs addded */}
      <div
        className={`${
          arryleg.length > 0 ? "d-block " : "d-none "
        } container py-3`}
      >
        <div className="flex  flex-wrap justify-between">
          <p className="">Leg</p>
          <p className="">Leg Counts : {arryleg.length}</p>
        </div>
        {arryleg.map((eachleg, index) => {
          return (
            <div
              key={index}
              className="p-2 row justify-between my-3 px-3 shadow rounded"
            >
              {/* {JSON.stringify(eachleg)} */}
              <section className="flex  col-sm-4 justify-between flex-wrap">
                <div className="w-fit">
                  <select
                    onChange={(e) => handlearrychange(e, eachleg.id)}
                    value={eachleg.instrument}
                    className="block fs14 shadow my-2 outline-none border-1 border-slate-400 rounded p-1 "
                    name="instrument"
                    id="instrument"
                  >
                   {
                    company.map((value)=>{
                      return(
                        <option value={value}>{value} </option>
                      )
                    })
                   }
                  </select>
                  <div className="flex justify-between">
                    <button
                      name="position"
                      value={eachleg.position}
                      onClick={(e) => {
                        handlearrychange(e, eachleg.id);
                      }}
                      className={`p-1 px-3 text-white ${
                        eachleg.position === "buy"
                          ? "bg-green-500 "
                          : "bg-red-500"
                      } rounded`}
                    >
                      {" "}
                      {eachleg.position.slice(0, 1).toUpperCase()}
                    </button>
                    <button
                      name="optiontype"
                      value={eachleg.optiontype}
                      onClick={(e) => {
                        handlearrychange(e, eachleg.id);
                      }}
                      className={`p-1 px-2 text-black border-1 border-slate-500 rounded`}
                    >
                      {eachleg.optiontype.toUpperCase()}
                    </button>
                  </div>
                </div>
                {/* CP */}
                <div>
                  <select
                    name="strikecriteria"
                    value={eachleg.strikecriteria}
                    onChange={(e) => {
                      handlearrychange(e, eachleg.id);
                    }}
                    className="block fs14 shadow my-2 outline-none border-1 border-slate-400 rounded p-1 "
                  >
                    <option value="atm">ATM type</option>
                    <option value="closet">CP</option>
                  </select>
                  <select
                    name="striketype"
                    onChange={(e) => handlearrychange(e, eachleg.id)}
                    value={eachleg.striketype}
                    className={`block fs14 shadow ${
                      eachleg.strikecriteria === "atm" ? "" : "d-none"
                    }   my-2 outline-none border-1 border-slate-400 rounded p-1 `}
                  >
                    <option value="ATM">ATM</option>
                    <option value="ATM2">ATM2</option>
                  </select>
                  <input
                    type="number"
                    value={eachleg.closet}
                    name="closet"
                    onChange={(e) => {
                      handlearrychange(e, eachleg.id);
                    }}
                    className={`${
                      eachleg.strikecriteria === "closet" ? "d-block" : "d-none"
                    }  w-24
                border-1  my-2 fs14 shadow border-slate-400 px-2 p-1  outline-none rounded `}
                  />
                </div>
                <div>
                  Lots
                  <input
                    onChange={(e) => {
                      handlearrychange(e, eachleg.id);
                    }}
                    type="number"
                    name="totallot"
                    className="block outline-none border-1 border-slate-400 p-1 w-14 rounded"
                    value={eachleg.totallot}
                  />
                </div>
              </section>
              <section className="col-sm-6 flex flex-wrap gap-3 justify-between align-items-center">
                <div className="flex gap-1 ">
                  <input
                    id="target"
                    className="mb-0"
                    onChange={(e) => settargetcheck(e.target.checked)}
                    checked={targetcheck}
                    type="checkbox"
                  />
                  <p className={` ${!targetcheck ? "" : "d-none"} mb-0 mx-1 `}>
                    target
                  </p>
                  <div className={` ${targetcheck ? "" : "d-none"} `}>
                    <select
                      name="targetpercentage"
                      onChange={(e) => handlearrychange(e, eachleg.id)}
                      value={eachleg.targetpercentage}
                      id=""
                    >
                      <option value="TP">TP%</option>
                      <option value="TP pts">TP pts</option>
                      <option value="TP Spot">TP Spot %</option>
                      <option value="TP Spot pts">TP Spot pts</option>
                    </select>
                    <input
                      type="number"
                      onChange={(e) => handlearrychange(e, eachleg.id)}
                      name="targetvalue"
                      value={eachleg.targetvalue}
                      className={` rounded text-center  border-1 border-slate-400 block my-1 outline-none w-24 `}
                    />
                  </div>
                </div>

                <div className="flex gap-1 ">
                  <input
                    id="target"
                    className="mb-0"
                    onChange={(e) => setsellcheck(e.target.checked)}
                    checked={sellcheck}
                    type="checkbox"
                  />
                  <p className={` ${!sellcheck ? "" : "d-none"} mb-0 mx-1 `}>
                    Stoploss
                  </p>
                  <div className={` ${sellcheck ? "" : "d-none"} `}>
                    <select
                      name="sellpercentage"
                      onChange={(e) => handlearrychange(e, eachleg.id)}
                      value={eachleg.sellpercentage}
                      id=""
                    >
                      <option value="SP">SP%</option>
                      <option value="SP pts">SP pts</option>
                      <option value="SP Spot">SP Spot %</option>
                      <option value="SP Spot pts">SP Spot pts</option>
                    </select>
                    <input
                      type="number"
                      onChange={(e) => handlearrychange(e, eachleg.id)}
                      name="sellvalue"
                      value={eachleg.sellvalue}
                      className={` rounded text-center  border-1 border-slate-400 block my-1 outline-none w-24 `}
                    />
                  </div>
                </div>
                {/* Trail stop loss */}
                <div>
                <input onClick={()=>setmodal(!modalshow)} type="checkbox" />
                  Trail Stop loss

                </div>
                <Modal show={modalshow}   onHide={()=>setmodal(false)}
        backdrop="static"
        keyboard={false} className="">
                   <Modal.Header closeButton>
                            Trail Stoploss Settings
                   </Modal.Header>
                   <Modal.Body className="flex gap-2">
                   

                   </Modal.Body>


                </Modal>
                {/* <div className="flex gap-1 ">
                  <input
                    id="target"
                    className="mb-0"
                    onChange={(e) => setwaitcheck(e.target.checked)}
                    checked={waitcheck}
                    type="checkbox"
                  />
                  <p
                    className={` ${!waitcheck ? "" : "d-none"} fs14 mb-0 mx-1 `}
                  >
                    Wait&Trade
                  </p>
                  <div className={` ${waitcheck ? "" : "d-none"} `}>
                    <select className="outline-none"
                      name="sellpercentage"
                      onChange={(e) => handlearrychange(e, eachleg.id)}
                      value={eachleg.sellpercentage}
                      id=""
                    >
                      <option value="% &uarr; ">% &uarr;</option>
                      <option value="% &darr; ">% &darr;</option>
                      
                      <option value="Pts &uarr;"> Pts &uarr;</option>
                      <option value="Pts &darr;"> Pts &darr;</option>

                      <option value="Spot % &uarr;">Spot % &uarr;</option>
                      <option value="Spot % &darr;">Spot % &darr;</option>

                      <option value="Spot pts &uarr;">Spot pts &uarr;</option>
                      <option value="Spot pts &darr;">Spot pts &darr;</option>

                    </select>
                    <input
                      type="number"
                      onChange={(e) => handlearrychange(e, eachleg.id)}
                      name="sellvalue"
                      value={eachleg.sellvalue}
                      className={` rounded text-center  border-1 border-slate-400 block my-1 outline-none w-24 `}
                    />
                  </div>
                </div>
                <div>
                  <input type="checkbox" />
                  Re-entry
                </div> */}
                {/* Delete button */}
                <div className="flex flex-col gap-3">
                  <button onClick={()=>setarryleg((prve)=>{
                    return prve.filter((data)=>data.id!=eachleg.id)
                  })} className="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg>
                  </button>
                  <button  onClick={() => {
              if (arryleg.length > 0)
                setarryleg((prev) => {
                  return [
                    ...prev,
                    { ...eachleg, id: prev[prev.length - 1].id + 1 },
                  ];
                });
              else
                setarryleg((prev) => {
                  return [...prev, { ...leg, id: 1 }];
                });
            }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
</svg>
                  </button>

                </div>
              </section>
             
            </div>
          );
        })}
        <hr />
      </div>

      {/* Overall mtm */}
      <article className="row mx-auto justify-between container">
        <div className="col-sm-6 col-lg-3 mb-4">
          <p className="fw-semibold text-lg ">Overall MTM</p>
          <div className="flex flex-wrap justify-between mt-8">
            <p className="fs14">Stop loss</p>
            <select
              name="mtm"
              onChange={handlechange}
              className="fs14 h-fit w-fit rounded border-1 outline-none border-slate-400"
              value={leg.mtm}
              id=""
            >
              <option value="none">none</option>
              <option value="MTM">MTM</option>
              <option value="Premium%">Premium%</option>
            </select>
            <input
              type="number"
              className="border-1 w-20 outline-none text-center h-fit rounded border-slate-400"
            />
          </div>
          <div>
            <p>Trail stop loss</p>
            {/* <div> */}
                      {/* If instuments moves
                      <div className="p-2 w-40 px-3 rounded flex border-1 border-slate-400 gap-2 ">
                        X <input type="number" className="w-full numberwithoutspin outline-none border-0" />
                      </div>
                      

                    </div>
                    <div>
                      Then move Stoploss by
                      <div className="p-2 w-40 px-3 rounded flex border-1 border-slate-400 gap-2 ">
                        Y <input type="number" className="w-full numberwithoutspin outline-none border-0" />
                      </div>
                    </div> */}
                    <select className="p-1 px-3 w-fit outline-none rounded cursor-pointer border-1 border-slate-400 h-fit " name="" id="">
                    <option value="SP">SP%</option>
                      <option value="SP pts">SP pts</option>
                    </select>
                    <input type="number" className="p-1 mx-2 outline-none numberwithoutspin  px-3 border-1 border-slate-500 rounded w-24 " />
                   
          </div>

          {/* <div
            className="fs14 my-3"
            disabled={`${leg.mtm == "none" ? "true" : "false"}`}
          >
            <input type="checkbox" className="" />
            SL Re-entry
            <input
              type="number"
              value={leg.slreentry}
              className=" border-1  border-slate-400 outline-none rounded w-14 mx-3 text-center "
              name="slreentry"
              id=""
            />
          </div> */}
        </div>
        {/* Overall target */}
        <div className="col-lg-9 mb-4">
          <p className="fw-semibold text-lg text-center">Profit Management</p>
          {/* Row 2 */}
          <div className="flex flex-wrap gap-3 justify-between flex-col flex-xl-row ">
            {/* Overall target */}
            <div className="col-lg-7 col-xl-3  mx-auto my-sm-0 my-3">
              <div className="flex flex-wrap   justify-between">
                <p className="fs14">  Target</p>
                <select
                  name="mtm"
                  onChange={handlechange}
                  className="fs14 h-fit w-fit rounded border-1 outline-none border-slate-400"
                  value={leg.mtm}
                  id=""
                >
                  <option value="none">none</option>
                  <option value="MTM">MTM</option>
                  <option value="Premium%">Premium%</option>
                </select>
                <input
                  type="number"
                  className="border-1 w-20 outline-none text-center h-fit rounded border-slate-400"
                />
              </div>

              {/* <div
                className="fs14 my-3"
                disabled={`${leg.mtm == "none" ? "true" : "false"}`}
              > 
                <input type="checkbox" className="mx-2" />
                Target Re-entry
                <input
                  type="number"
                  value={leg.slreentry}
                  className=" border-1  border-slate-400 outline-none rounded w-14 mx-3 text-center "
                  name="slreentry"
                  id=""
                />
              </div> */}
            </div>
            {/* Lock and trail */}
            <div className="col-xl-7 mx-auto my-3 my-sm-0  fs14 ">
              <input type="checkbox" name="" value="" />
              <select
                name=""
                className=" px-2 mx-2 border-1 border-slate-400 rounded fs14 outline-none "
                id=""
              >
                <option value="Lock profit">Lock Profit</option>
                <option value="Lock and Trail">Lock and Trail</option>
                <option value="Trail profit">Trail Profit</option>
              </select>
              {/* If profits reaches */}
              <div className="flex flex-sm-row flex-col sm:ps-9 my-3  justify-between  flex-wrap">
               <div className="w-4/6 mx-auto sm:w-1/2 flex px-1 justify-between">
                <p>If profit reaches</p>
                <div className="border-1 text-blue-700 h-fit p-1 px-2 inline rounded border-slate-400 w-fit">
                  &#8377;
                  <input
                    type="number"
                    className="border-none numberwithoutspin outline-none w-12 text-center"
                  />
                </div></div> 
                <div className="w-4/6 mx-auto sm:w-1/2 px-1 flex justify-between">
                <p>Lock Profit At</p>
                <div className="border-1 h-fit p-1 px-2 text-blue-700 inline rounded border-slate-400 w-fit">
                  &#8377;
                  <input
                    type="number"
                    className="border-none numberwithoutspin outline-none w-12 text-center"
                  />
                </div>
                </div>
              </div>


              {/* Lock and trail */}
              <div className="flex flex-sm-row flex-col sm:ps-9  my-sm-0 my-3 justify-between  flex-wrap">
               <div className="w-4/6 mx-auto sm:w-1/2 flex px-1 justify-between">
                <p className="pe-3">For every increase in profit by</p>
                <div className="border-1 flex text-blue-700 h-fit p-1 px-2 rounded border-slate-400 w-fit">
                  &#8377;
                  <input
                    type="number"
                    className="border-none numberwithoutspin outline-none w-12 text-center"
                  />
                </div></div> 
                <div className="w-4/6 mx-auto sm:w-1/2 px-1 flex justify-between">
                <p className="pe-3">Trail minimum profit by</p>
                <div className="border-1 h-fit flex p-1 px-2 text-blue-700  rounded border-slate-400 w-fit">
                  &#8377;
                  <input
                    type="number"
                    className="border-none numberwithoutspin outline-none w-12 text-center"
                  />
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </article>
      {/* Smart Hedge Execution */}
      <Row className="container my-sm-0 my-3 fs14 mx-auto ">
        <Col sm={6} >
          <p className="fw-semibold text-lg ">Smart Hedge Execution</p>
          <div className="my-sm-0 my-4">
            <input type="checkbox" className="mx-2"/>
            Sell will be delayed by 
            <input type="number" 
            className="numberwithoutspin border-1 rounded outline-none  border-slate-400 text-center w-10 px-2 mx-2" />
            sec
          </div>

        </Col>
        <Col sm={6} >
          {/* {selecteddays.includes("Monday")?"ture":"false"} */}
          {/* {selecteddays} */}
          {/* <p className="fw-semibold text-lg ">Days to Execute</p>
          <div className="flex flex-wrap gap-3 justify-between ">
            <button onClick={()=>{
              if(daysarry.every(day=>selecteddays.includes(day)))
                 setselecteddays([])
              else
              setselecteddays([...daysarry])

            } }
             className={` ${daysarry.every(day => selecteddays.includes(day))?'bg-blue-700 text-white border-1' : 'text-black bg-slate-50 border-blue-600 border-1 '}  p-2 px-3 w-24 rounded `}>All</button>
             {
              daysarry.map((day)=>{
                return(
                  <button onClick={()=>{
                    setselecteddays((prev)=>{
                      if(prev.indexOf(day)<0)
                        return [...prev,day]
                    else
                       return prev.filter((d)=>d!==day)

                    })
                   
                  }} className={`${selecteddays.indexOf(day)!=-1 ? ' bg-blue-700 border-1 text-white ': "border-1 bg-slate-50 border-blue-700 "}  p-2 px-3 w-24 rounded `}> {day} </button>
                )
              })
             }
          </div>
              */}
          
          </Col>
      </Row>
      <button onClick={()=>{
        setdata((prev)=>{return [...prev,JSON.stringify(leg)]})
      navigate('/welcome/');
    }}
      className={`bg-blue-600 text-white mx-auto my-3 w-fit p-2 px-3 flex rounded `}>
       Save strategy </button>
    </div>
  );
};

export default Stratergy;
