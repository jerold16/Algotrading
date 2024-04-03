import React, { useEffect, useState } from "react";
import { Col, ListGroup, Modal, Row, Spinner } from "react-bootstrap";
import Navbar from "./Navbar";
import Timer from "./Timer";
import { useNavigate } from "react-router";
import axios from "axios";
import { hostname, primarybg } from "../App";
import { toast } from "react-toastify";

const Stratergy = (props) => {
  let { setactive } = props
  let [lotsize, setlotsize] = useState()
  let navigate = useNavigate()
  let [sterror, setstError] = useState()
  let user = JSON.parse(sessionStorage.getItem('user'))
  let [apiRequest, setApiRequest] = useState(false)
  let [stname, setstname] = useState('')
  let { setdata } = props
  let [errormessage, setError] = useState()
  let [targetcheck, settargetcheck] = useState(false);
  let [sellcheck, setsellcheck] = useState(false);
  // let [waitcheck, setwaitcheck] = useState(false);
  // let [EntryTime, setentrytime] = useState("09:30:00");
  // let [exittime, setexittime] = useState("15:00:00");
  let [companyList, setCompanyList] = useState([])
  let [arryleg, setarryleg] = useState([]);
  let [companyExpireDate, setCompanyExprieDate] = useState()
  const SuccessMsg = (st) => {
    toast.success(st, {
      // position: toast.POSITION.TOP_RIGHT,
    });
  };
  let [leg, setleg] = useState({
    name: '',
    segments: 'OPT',
    optiontype: 'ce',
    variety: '',
    tradingsymbol: '',
    symboltoken: '',
    transactiontype: 'buy',
    exchange: 'NFO',
    ordertype: '',
    producttype: '',
    duration: '',
    price: '',
    stoploss: '',
    totallot: '1',
    quantity: '',
    triggerprice: '',
    expirydate: '',
    strikeprice: '',
    trailingstoploss: ''
  })
  useEffect(() => {
    setApiRequest(true)
    setactive("strategy")
    axios.get(`${hostname}/Companyname_expiry/`)
      .then((response) => {
        setCompanyList(response.data)
        console.log(response.data);
        setApiRequest(true)
      }).catch((error) => {
        console.log(error);
      })
  }, [])

  let [strikeobj, setstrikeobj] = useState()
  // let [leg, setleg] = useState({
  //   name: "",
  //   mtm: "none",
  //   slreentry: 0,
  //   instrument: "",
  //   segments: "OPT",
  //   position: "buy",
  //   optiontype: "ce",
  //   strikecriteria: "atm",
  //   striketype: "",
  //   targetpercentage: "TP",
  //   sellpercentage: "SP",
  //   targetvalue: null,
  //   sellvalue: null,
  //   closet: 0,
  //   totallot: 1,
  //   extralegs: arryleg,
  // });

  let handlechange = (e) => {
    let { name, value } = e.target;
    if (name == 'strikeprice') {
      let arry = leg.optiontype == 'ce' ? ceStrike : peStrike
      let exp = arry.find(obj => obj.strike === value)
      setlotsize(exp.lotsize)
      setstrikeobj(exp)
      setleg((prev) => ({
        ...prev,
        symboltoken: exp.token,
        tradingsymbol: exp.symbol,
        quantity: leg.totallot ? Number(leg.totallot) * Number(exp.lotsize) : Number(exp.lotsize)
      }))
    }

    if (name === "totallot" && !isNaN(Number(value))) {
      if (Number(value) < 0) value = 1;
      else if (Number(value) > 60) value = 60;
      else value = Number(value);
      setleg((prev) => ({
        ...prev,
        totallot: e.target.value,
        quantity: value * Number(strikeobj.lotsize)
      }))
    }
    setleg((prevleg) => ({
      ...prevleg,
      [name]: value,
    }));
  };

  let handlearrychange = (e, id) => {
    let { name, value } = e.target;
    // if(name==='triggerprice'){
    //   const leg =arryleg.find(obj => obj.id==id)
    //   if(Number(leg.price)>=value && 
    //   leg.transactiontype=='buy'){
    //   value=Number(leg.price)
    //   }
    //   if(Number(leg.price)<=value && leg.transactiontype=='sell')
    //   value=leg.price
    // }
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
    if (name === "transactiontype" && value == "buy") value = "sell";
    else if (name == "transactiontype" && value == "sell") value = "buy";
    if (name == "optiontype" && value == "ce") value = "pe";
    else if (name == "optiontype" && value == "pe") value = "ce";
    if (name == "closet" && value < 0) value = 0;
    setarryleg((prevLegs) =>
      prevLegs.map((prevLeg) =>
        prevLeg.id === id ? { ...prevLeg, [name]: value } : prevLeg
      )
    );
  };
  let [ceStrike, setceStrike] = useState([])
  let [peStrike, setpeStrike] = useState([])

  let getStrikePrice = (e) => {
    e.preventDefault()
    handlechange(e)
    setApiRequest(false)
    axios.post(`${hostname}/Expiry_CEPEonly/`, {
      name: leg.name,
      expiry: e.target.value
    }).then((response) => {
      console.log(response.data);
      setceStrike(response.data.CE)
      setpeStrike(response.data.PE)
      setApiRequest(true)
    }).catch((error) => {
      console.log(error);
    })
  }
  let numberNameCreator = (n) => {
    let temp = (n + '').slice(-1, 1)
    if (temp == '1')
      return `${n}st`
    if (temp == '2')
      return `${n}nd`
    if (temp == '3')
      return `${n}rd`
    if (temp >= '4')
      return `${n}th`
  }
  let checkEachLeg = () => {
    let hasError = false;
    let errorMessages = [];

    arryleg.forEach((x, index) => {
        if (x.triggerprice === '') {
            let nth = numberNameCreator(Number(index) + 1);
            errorMessages.push(`* ${nth} leg doesn't have Target price`);
            hasError = true;
        }
        // Add other checks similarly

        if (x.stoploss === '') {
            let nth = numberNameCreator(Number(index) + 1);
            errorMessages.push(`* ${nth} leg doesn't have StopLoss`);
            hasError = true;
        }

        if (x.trailingstoploss === '') {
            let nth = numberNameCreator(Number(index) + 1);
            errorMessages.push(`* ${nth} leg doesn't have Trailing StopLoss`);
            hasError = true;
        }
    });

    if (hasError) {
        // Combine all error messages into one string
        setstError(errorMessages.join("\n"));
        return false;
    }

    return true;
};

  let sendData = (e) => {
    e.preventDefault()
    if (arryleg.length > 0 && stname != '' && checkEachLeg()) {
      setstError('')
      setApiRequest(false)
      console.log({ user_id: user, strategy_name: stname, leg: arryleg });
      axios.post(`${hostname}/StrategyView/`, {
        user_id: user,
        strategy_name: stname, leg: arryleg
      }).then((response) => {
        console.log(response.data);
        setApiRequest(true);
        SuccessMsg("Strategy has been saved")
        setleg({
          name: '',
          segments: 'OPT',
          optiontype: 'ce',
          variety: '',
          tradingsymbol: '',
          symboltoken: '',
          transactiontype: 'buy',
          exchange: 'NFO',
          ordertype: '',
          producttype: '',
          duration: '',
          price: '',
          stoploss: '',
          quantity: '',
          triggerprice: '',
          expirydate: '',
          strikeprice: '',
          trailingstoploss: ''
        })
        setarryleg([])
        setstname('')
      }).catch((error) => console.log(error))
    }
    else{
      
      if(stname==''){
        setstError("* Enter the Name for the Strategy")
        return
      }
      if(arryleg.length == 0){
        setstError("*Add the Legs to the Strategy before save")
        return
      }
        
      }

  }
  let changeExpire = (e) => {
    handlechange(e)
    let companyname = e.target.value;
    let exparry = companyList.find(obj => obj.name == companyname).expiry
    setCompanyExprieDate(exparry)
  }
  let legValidation = () => {
    console.log(leg);
    if (leg.name == '') {
      setError("* enter the Company name"); return
    }
    if (leg.expirydate == '') {
      setError("* choose the Expiry Date"); return
    }
    if (leg.strikeprice == '') {
      setError("* enter the StrikePrice"); return
    }
    if (leg.price == '') {
      setError('* choose the price'); return
    }
    if (leg.producttype == '') {
      setError('* choose the productType'); return
    }

    if (leg.duration == '') {
      setError('* choose the Duration'); return
    }
    if (leg.variety == '') {
      setError('* choose the variety'); return
    }
    if (leg.totallot == '0') {
      setError('* enter the Number of Lot'); return
    }

  }
  return (
    <div className={`min-h-[100vh]  `}>
      {
        companyList.length > 0 && apiRequest ? <>

          <div className={`min-h-[8vh] sticky-top items-center justify-between px-5 flex flex-col flex-sm-row border-2`}>
            <p className="mb-0">Create Strategy </p>
            <div>
              <p className="mb-0"> <Timer /> </p>
            </div>
          </div>
          {/* Strategy name  */}
          <div className="row  mx-auto  my-2 my-sm-1 ">
            <div className="col-sm-6 my-3 my-sm-2">
              <p className="fs14 fw-semibold text-lg">Strategy Name </p>
              <input
                type="text" name="" value={stname} onChange={(e) => setstname(e.target.value)}
                className="p-2 rounded lg:w-3/6 focus-within:outline-none border-slate-400 px-3 border-1"
                placeholder="eg : Straddle"
              />
            </div>

            {/* Time Entry and exit here */}
            <hr />
          </div>

          {/* Add Leg */}
          <div className="py-3 py-sm-1 fs14 container">
            <div className="flex flex-wrap gap-2 justify-between">

              <p className="fw-semibold text-lg ">Add Leg</p>
              {/* Symbol TOken */}
              <div className="p-2 px-3 shadow h-fit rounded">
                Token:  {leg.symboltoken}
              </div>
              {/* Symbol */}
              <div className="p-2 px-3 shadow h-fit rounded">
                Symbol :  {leg.tradingsymbol}
              </div>
              {/* Quantity */}
              <div className="p-2 px-3 shadow h-fit rounded">
                Quantity :  {leg.quantity}
              </div>
              {/* LotSize */}
              <div className="p-2 px-3 shadow h-fit rounded">
                LotSize :  {lotsize}
              </div>
              {/* To show the Exprie date */}

              <div>

                <p className="fw-semibold mb-1 text-lg ">Expire Date</p>
                <select name="expirydate" onChange={getStrikePrice} className="border-1 outline-none p-1 px-2 rounded shadow w-32 " value={leg.expirydate} id="">
                  <option value=""> select Expire </option>
                  {
                    companyExpireDate != null ? companyExpireDate.map((x) => {
                      return (

                        <option value={x}>{x} </option>
                      )
                    }) : ''
                  }
                </select>
              </div>
            </div>
            <section className="flex my-3  mb-4 gap-3 justify-between items-center flex-wrap ">
              <div className="">
                {/* Instrument */}
                Company / Index
                <select
                  onChange={changeExpire}
                  value={leg.name}
                  className="block fs14 shadow my-2 outline-none border-1 border-slate-400 rounded p-1 "
                  name="name"
                  id="instrument"
                >
                  <option value="">Select</option>
                  {companyList.map((value, id) => {
                    return (
                      <option className="" key={id} value={`${value.name.toUpperCase()}`}>{value.name} </option>
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
                    className={`p-1 px-3  transition duration-500 rounded outline-none ${leg.segments == "OPT"
                      ? "bg-blue-50 border-1  border-blue-600 text-blue-600"
                      : ""
                      }`}
                  >
                    OPT
                  </button>
                  {/* <button
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
            </button> */}
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
                    className={`p-1 px-4  transition duration-500 rounded outline-none ${leg.optiontype == "ce"
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
                    className={`p-1 px-4 transition duration-500 rounded outline-none  ${leg.optiontype == "pe"
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
                <select
                  name="strikeprice"
                  value={leg.strikecriteria}
                  onChange={handlechange}
                  className={`block ${leg.optiontype == "ce" ? "d-block" : "d-none"}  fs14 shadow my-2 w-24 outline-none border-1 border-slate-400 rounded p-1 `}
                >  <option value="">Select CE</option>
                  {ceStrike != undefined ?
                    ceStrike.map((value) => {
                      return (
                        <option value={value.strike}>{parseFloat(value.strike / 100).toFixed(2)}</option>
                      )
                    }) : ''
                  }
                </select>
                <select
                  name="strikeprice"
                  value={leg.strikecriteria}
                  onChange={handlechange}
                  className={`block  ${leg.optiontype == "pe" ? "d-block" : "d-none"} fs14 shadow my-2 w-24 outline-none border-1 border-slate-400 rounded p-1`}
                >  <option value="">SelectPe</option>
                  {peStrike != undefined ?
                    peStrike.map((value) => {
                      return (
                        <option value={value.strike}>{parseFloat(value.strike / 100).toFixed(2)}</option>
                      )
                    }) : ''
                  }
                </select>
              </div>
              <div className={`${leg.segments === "FUT" ? "d-none" : ""}`}>
                Entry Price
                <input type="number"
                  value={leg.price} name="price"
                  onChange={handlechange}
                  className="d-block numberwithoutspin p-2 px-3 border-1 outline-none shadow rounded my-1 w-32  " />
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
              {/* <div className={`${leg.segments === "FUT" ? "d-none" : ""}`}>
            Square off
            <input type="number" className="d-block numberwithoutspin p-2 px-3 border-1 outline-none shadow rounded my-1 w-32  " />
            </div> */}
              {/* Variety */}
              <div>
                Variety
                <select type="text" onChange={handlechange} value={leg.variety} name="variety"
                  className="d-block numberwithoutspin p-2 px-3 border-1 outline-none shadow rounded my-1 w-32  " >
                  <option value="">Select</option>
                  <option value="NORMAL">NORMAL</option>
                  <option value="AMO">AMO</option>
                  <option value="STOPLOSS">Stop Loss </option>
                </select>

              </div>
              <div>
                OrderType
                <select type="text" onChange={handlechange} value={leg.ordertype} name="ordertype"
                  className="d-block numberwithoutspin p-2 px-3 border-1 outline-none shadow rounded my-1 w-32  " >
                  <option value="">Select</option>
                  <option value="LIMIT">Limit Order(L) </option>
                  <option value="MARKET">Market Order (MKT) </option>
                  <option value="STOPLOSS_LIMIT">Stop Loss Limit Order(SL) </option>
                  <option value="STOPLOSS_MARKET">Stop Loss Market Order (SL-M)</option>

                </select>

              </div>
              <div>
                Duration
                <select type="text" onChange={handlechange} value={leg.duration} name="duration"
                  className="d-block numberwithoutspin p-2 px-3 border-1 outline-none shadow rounded my-1 w-32  " >
                  <option value="">Select</option>
                  <option value="DAY">Regular Order</option>
                  <option value="IOC">Immediate or Cancel </option>
                </select>

              </div>
              <div className={`${leg.segments === "FUT" ? "d-none" : ""}`}>
                Product type
                <select type="text" onChange={handlechange} value={leg.producttype} name="producttype"
                  className="d-block numberwithoutspin p-2 px-3 border-1 outline-none shadow rounded my-1 w-32  " >
                  <option value="">Select</option>
                  <option value="INTRADAY">Intraday</option>
                  <option value="CARRYFORWARD">Carry forward</option>
                </select>

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
                    name="transactiontype"
                    value="buy"
                    onClick={handlechange}
                    className={`p-1 px-3  transition duration-500 rounded outline-none  ${leg.transactiontype == "buy"
                      ? "bg-blue-50  border-1 border-green-600 "
                      : ""
                      } text-green-600`}
                  >
                    BUY
                  </button>
                  <button
                    name="transactiontype"
                    value="sell"
                    onClick={handlechange}
                    className={`p-1 px-3 transition duration-500 rounded outline-none text-red-600  ${leg.transactiontype == "sell"
                      ? "bg-red-50 border-1  border-red-600 "
                      : ""
                      }`}
                  >
                    SELL
                  </button>
                </div>
              </div>
              <p className="text-red-600 m-0 ms-auto">{errormessage} </p>
              <button
                onClick={() => {
                  if (leg.symboltoken != '' && leg.price != '' && leg.producttype != '' && leg.variety != '' && leg.expirydate != ''
                    && leg.price != '' && leg.quantity != '') {
                    setError('')
                    if (leg.name != '' && leg.duration != '' && leg.price != '') {
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
                    }
                    else {
                      console.log(leg);
                    }
                  }
                  else
                    legValidation()
                }}
                className="p-2 h-fit px-3 ms-auto bg-blue-500 hover:bg-blue-600 text-white rounded "
              >
                Add Leg
              </button>
            </section>

            <hr className="" />
          </div>
          {/* Legs addded */}
          <div
            className={`${arryleg.length > 0 ? "d-block " : "d-none "
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

                  <section className="flex gap-3 col-sm-9 justify-between flex-wrap">
                    <div className="w-fit ">
                      <input disabled type="text" className="text-slate-950 p-2 border-1 my-2 w-32 shadow rounded outline-none border-slate-500"
                        value={eachleg.name} />
                      {/* <select
                  onChange={(e) => {handlearrychange(e, eachleg.id);getStrikePrice(e)}}
                  value={eachleg.instrument}
                  className="block fs14 shadow my-2 outline-none border-1 border-slate-400 rounded p-1 "
                  name="instrument"
                  id="instrument">
                {companyList.map((value,id)=>{
              return(
<option className="" key={id} value={`${value.toUpperCase()}`}>{value} </option>
              )
            })}
                </select> */}
                      <div className="flex  justify-between">
                        <button
                          name="transactiontype"
                          value={eachleg.transactiontype}
                          onClick={(e) => {
                            handlearrychange(e, eachleg.id);
                          }}
                          className={`p-1 px-3 text-white ${eachleg.transactiontype === "buy"
                            ? "bg-green-500 "
                            : "bg-red-500"
                            } rounded`}
                        >
                          {" "}
                          {eachleg.transactiontype.slice(0, 1).toUpperCase()}
                        </button>
                        {/* Option Type CE or PE */}
                        <button disabled
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
                    <div className="">
                      {/* <select
                        name="strikecriteria"
                        value={eachleg.strikecriteria}
                        onChange={(e) => {
                          handlearrychange(e, eachleg.id);
                        }}
                        className="block fs14 shadow my-2 outline-none border-1 border-slate-400 rounded p-1 ">
                        <option value="atm">5330</option>
                        <option value="closet">5310</option>
                      </select> */}
                      <input
                        name="striketype"
                        onChange={(e) => handlearrychange(e, eachleg.id)}
                        // value={eachleg.striketype}
                        value="34"

                        className={`block fs14 shadow ${eachleg.strikecriteria === "atm" ? "" : "d-none"
                          }  w-16 my-2 outline-none border-1 border-slate-400 rounded p-1 `}
                      />
                      <input

                        type="number"
                        value={eachleg.closet}
                        name="closet"
                        onChange={(e) => {
                          handlearrychange(e, eachleg.id);
                        }}
                        className={`${eachleg.strikecriteria === "closet" ? "d-block" : "d-none"
                          }  w-24
              border-1  my-2 fs14 shadow border-slate-400 px-2 p-1  outline-none rounded `}
                      />
                    </div>
                    <div>
                      Lots
                      <input
                        onChange={(e) => {
                          handlearrychange(e, eachleg.id);
                        }} disabled
                        type="number"
                        name="totallot"
                        className="block outline-none border-1 border-slate-400 p-1 w-14 rounded"
                        value={eachleg.totallot}
                      />
                    </div>
                    {/* Each leg Symbol  */}
                    <div className="">
                      <p className="m-0 mb-1">Symbol </p>
                      <p className="shadow m-0 h-fit p-2 rounded">
                        {eachleg.tradingsymbol}
                      </p>
                    </div>

                    {/* Strike Cireteria */}
                    <div className={`${leg.segments === "FUT" ? "d-none" : "d-inline"}`}>
                      Strike Price
                      <input type="number" value={eachleg.strikeprice} className="d-block numberwithoutspin p-2 px-3 border-1 outline-none shadow rounded my-1 w-32  " />
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
                    <div className={`${eachleg.segments === "FUT" ? "d-none" : ""}`}>
                      Entry Price
                      <input type="number" disabled onChange={handlearrychange}
                        value={eachleg.price} name="price"
                        className="d-block numberwithoutspin p-2 px-3 border-1 outline-none shadow rounded my-1 w-32  " />
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
                    {/* <div className={`${leg.segments === "FUT" ? "d-none" : ""}`}>
          Square off
          <input type="number" className="d-block numberwithoutspin p-2 px-3 border-1 outline-none shadow rounded my-1 w-32  " />
          </div> */}
                    <div className="">
                      Product type :
                      <p className="m-0 p-2 shadow h-fit rounded"> {eachleg.producttype}</p>
                    </div>
                    <div className="">
                      Expire Date :
                      <p className="m-0 p-2 shadow h-fit rounded"> {eachleg.expirydate}</p>
                    </div>
                  </section>
                  <section className="col-sm-3 flex flex-wrap gap-3 justify-between align-items-center">
                    <div className="flex gap-1 ">
                      {/* <input
                        id="target"
                        className="mb-0"
                        onChange={(e) => settargetcheck(e.target.checked)}
                        checked={targetcheck}
                        type="checkbox"
                      />
                      <p className={` ${!targetcheck ? "" : "d-none"} mb-0 mx-1 `}>
                        target
                      </p> */}
                      {/* <div className={` ${targetcheck ? "" : "d-none"} `}> */}
                      <div className="">
                        Target
                        {/* <select
                          name="triggerprice"
                          onChange={(e) => handlearrychange(e, eachleg.id)}
                          value={eachleg.triggerprice}
                          id=""
                        >
                          <option value="TP">TP%</option>
                          <option value="TP pts">TP pts</option>
                          <option value="TP Spot">TP Spot %</option>
                          <option value="TP Spot pts">TP Spot pts</option>
                        </select> */}
                        <input
                          type="number"
                          onChange={(e) => handlearrychange(e, eachleg.id)}
                          name="triggerprice"
                          value={eachleg.triggerprice}
                          className={` rounded text-center  border-1 border-slate-400 block my-1 outline-none w-24 `}
                        />
                      </div>
                    </div>

                    <div className="flex gap-1 ">
                      {/* <input
                        id="target"
                        className="mb-0"
                        onChange={(e) => setsellcheck(e.target.checked)}
                        checked={sellcheck}
                        type="checkbox"
                      />
                      <p className={` ${!sellcheck ? "" : "d-none"} mb-0 mx-1 `}>
                        Stoploss
                      </p> */}
                      {/* <div className={` ${sellcheck ? "" : "d-none"} `}> */}
                      <div className="">
                        Stop Loss
                        {/* <select
                          name="sellpercentage"
                          onChange={(e) => handlearrychange(e, eachleg.id)}
                          value={eachleg.sellpercentage}
                          id=""
                        >
                          <option value="SP">SP%</option>
                          <option value="SP pts">SP pts</option>
                          <option value="SP Spot">SP Spot %</option>
                          <option value="SP Spot pts">SP Spot pts</option>
                        </select> */}
                        <input
                          type="number"
                          onChange={(e) => handlearrychange(e, eachleg.id)}
                          name="stoploss"
                          value={eachleg.stoploss}
                          className={` rounded text-center  border-1 border-slate-400 block my-1 outline-none w-24 `}
                        />
                      </div>
                    </div>
                    {/* Trail stop loss */}
                    <div>
                      {/* <input onClick={()=>setmodal(!modalshow)} type="checkbox" /> */}
                      Trail Stop loss
                      <div className=" mt-2">
                        {/* <select className="p-1 px-3 w-fit outline-none rounded cursor-pointer border-1 border-slate-400 h-fit " name="" id="">
                          <option value="SP">SP%</option>
                          <option value="SP pts">SP pts</option>
                        </select> */}
                        <input type="number" onChange={(e) => handlearrychange(e, eachleg.id)} name="trailingstoploss" value={eachleg.trailingstoploss}
                          className="p-1 mx-2 outline-none numberwithoutspin  px-3 border-1 border-slate-500 rounded w-24 " />
                      </div>

                    </div>

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
                      <button onClick={() => setarryleg((prve) => {
                        return prve.filter((data) => data.id != eachleg.id)
                      })} className="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                        </svg>
                      </button>
                      <button onClick={() => {
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
                          <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z" />
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
            <div className="col-sm-6 col-lg-8 mb-4">
              <p className="fw-semibold text-lg ">Overall MTM</p>
              <div className="flex flex-wrap  justify-between items-center">
                <div className="flex gap-2 items-center mt-8">
                  <p className="fs14 m-0">Stop loss</p>
                  {/* <select
                    name="mtm"
                    onChange={handlechange}
                    className="fs14 h-fit w-fit mx-2 p-1 rounded border-1 outline-none border-slate-400"
                    value={leg.mtm}
                    id=""
                  >
                    <option value="none">none</option>
                    <option value="MTM">MTM</option>
                    <option value="Premium%">Premium%</option>
                  </select> */}
                  <input
                    type="number"
                    className="border-1 w-20 p-1 outline-none text-center h-fit rounded border-slate-400"
                  />
                </div>
                <div className="flex gap-2 items-center mt-8">
                  <p className="fs14 m-0">  Target</p>
                  {/* <select
                    name="mtm"
                    onChange={handlechange}
                    className="fs14 h-fit p-1 w-fit mx-2 rounded border-1 outline-none border-slate-400"
                    value={leg.mtm}
                    id="">
                    <option value="none">none</option>
                    <option value="MTM">MTM</option>
                    <option value="Premium%">Premium%</option>
                  </select> */}
                  <input
                    type="number"
                    className="border-1 p-1 w-20 outline-none text-center h-fit rounded border-slate-400"
                  />
                </div>
                <div className="flex gap-2 items-center mt-8">
                  <p className="fs14 m-0">Trail stop loss</p>
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
                  {/* <select className="p-1 px-3 w-fit outline-none rounded cursor-pointer border-1 border-slate-400 h-fit " name="" id="">
                    <option value="SP">SP%</option>
                    <option value="SP pts">SP pts</option>
                  </select> */}
                  <input type="number" className="p-1 mx-2 outline-none numberwithoutspin  px-3 border-1 border-slate-500 rounded w-24 " />

                </div>
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
            {/* <div className="col-lg-9 mb-4">
              <p className="fw-semibold text-lg text-center">Profit Management</p> */}
            {/* Row 2 */}
            {/* <div className="flex flex-wrap gap-3 justify-between flex-col flex-xl-row "> */}
            {/* Overall target */}
            {/* <div className="col-lg-7 col-xl-3  mx-auto my-sm-0 my-3"> */}


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
            {/* </div> */}
            {/* Lock and trail */}
            {/* <div className="col-xl-7 mx-auto my-3 my-sm-0  fs14 ">
                  <input type="checkbox" name="" value="" />
                  <select
                    name=""
                    className=" px-2 mx-2 border-1 border-slate-400 rounded fs14 outline-none "
                    id=""
                  >
                    <option value="Lock profit">Lock Profit</option>
                    <option value="Lock and Trail">Lock and Trail</option>
                    <option value="Trail profit">Trail Profit</option>
                  </select> */}
            {/* If profits reaches */}
            {/* <div className="flex flex-sm-row flex-col sm:ps-9 my-3  justify-between  flex-wrap">
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
                  </div> */}


            {/* Lock and trail */}
            {/* <div className="flex flex-sm-row flex-col sm:ps-9  my-sm-0 my-3 justify-between  flex-wrap">
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
            </div> */}
            <hr />
          </article>
          {/* Smart Hedge Execution */}
          <Row className="container my-sm-0 my-3 fs14 mx-auto ">
            {/* <Col sm={6} >
        <p className="fw-semibold text-lg ">Smart Hedge Execution</p>
        <div className="my-sm-0 my-4">
          <input type="checkbox" className="mx-2"/>
          Sell will be delayed by 
          <input type="number" 
          className="numberwithoutspin border-1 rounded outline-none  border-slate-400 text-center w-10 px-2 mx-2" />
          sec
        </div>

      </Col> */}
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
          <p className="text-red-600 text-center h-[30px] "> {sterror} </p>
          <button onClick={(e) => {
            sendData(e)
            setdata((prev) => { return [...prev, JSON.stringify(leg)] })
            // navigate('/welcome/');
          }}
            className={`bg-blue-600 text-white mx-auto my-3 w-fit p-2 px-3 flex rounded `}>
            Save strategy </button></>
          : <div className=" h-[90vh] flex">
            <Spinner className="m-auto" animation="grow" />

          </div>
      }
    </div>
  );
};

export default Stratergy;
