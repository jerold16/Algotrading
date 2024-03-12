import React, { useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

const Forgot = () => {
  const [email, setemail] = useState("");
  const [showchangepassword, setshowchangepassword] = useState(false);
  const [password, setpassword] = useState("");
  const [confirmpasword, setconfirmpassword] = useState("");
  const [view, setview] = useState(false);
  const [view1, setview1] = useState(false);
  const [enterotp, setenterotp] = useState("");
  const [errormessage,seterror]=useState("")
  let navigate = useNavigate();
  let otpbyemail=()=>{
    let emailreg=/^[0-9a-zA-Z]{2,}@[a-z]{2,}.[a-z]{2,}$/
    if(emailreg.test(email)){
        seterror("")
       alert("Code has been sended to Your email")
       setshowchangepassword(true)
    }   
    else
        seterror("*Enter the proper Mail")
  }
  let otpbynumber=(num)=>{
    let phone=/^[0-9]{10}$/
    if(phone.test(num)){
        seterror("")
       alert("Code has been sended to Your email")
       setshowchangepassword(true)
    }   
    else
        seterror("*Enter the proper Number")
  }
  
  let generateotp=(e)=>{
    e.preventDefault();
    if(email.length<=0)
      seterror("*Don't leave the field empty")
    else if(isNaN(Number(email)))
       otpbyemail()
    else
       otpbynumber(Number(email))  
  }
  
  return (
    <div>
      <Row className="container mx-auto align-items-center min-h-[70vh] xl:min-h-[100vh]">
        <Col lg={6} className="my-4">
          <h1 className="text-lg sm:text-3xl">Simplify your trading experience with our automated platform</h1>
          <img src={require("../assest/6256458.jpg")} alt="Trade Chart" />
        </Col>
        <Col
          lg={6}
          className={`${showchangepassword ? "d-none" : "d-block "} my-4 `}
        >
          <form
            action=""
            className="bg-slate-50 lg:w-[400px] min-h-[400px] flex flex-col justify-between mx-auto shadow-lg p-4 "
          >
            <h4 className="text-blue-600 text-2xl  text-center">
              Forgot Password ?
            </h4>
            <p className="w-fit mx-auto flex">
              Don’t worry ! Please enter the email or phone number associated
              with your account.
            </p>
            <div className="w-fit mx-auto">
              <input
                type="text"
                onChange={(e) => setemail(e.target.value)}
                name="email"
                value={email}
                className="block w-full bg-transparent my-3 p-2 border-1 border-blue-700 rounded focus-within:outline-none"
                placeholder="Email address/phone"
              />
            <p className="text-red-600 ">{errormessage}</p>
              <button
                onClick={generateotp}
                className="bg-blue-600 hover:bg-blue-700 p-2 px-3 rounded text-white mx-auto w-fit flex "
              >
                Send code
              </button>
            </div>
            <div>
              <p
                onClick={() => navigate("/login")}
                className="cursor-pointer text-center  hover:underline  text-blue-600 "
              >
                Remember Password ?{" "}
                <span className="underline text-blue-800">Log in</span>
              </p>
            </div>
          </form>
        </Col>
        {/* Set new password */}
        <Col
          lg={6}
          className={`${showchangepassword ? "d-block" : "d-none "} my-4`}
        >
          <form
            action=""
            className="bg-slate-50 lg:w-[400px] min-h-[400px] flex flex-col justify-between mx-auto shadow-lg p-4 "
          >
            <h4 className="text-blue-600 text-2xl  text-center">
              Please check your email
            </h4>

            <div className="w-fit mx-auto">
              <input value={enterotp}
              className="p-2 px-3 border-1 rounded bg-transparent border-black "
              onChange={(e)=>{
                if(e.target.value.length<=6)
                   setenterotp(e.target.value)
              }} type="number" 
              placeholder="Enter the 6 digit code " />
              <div className="block my-3 p-2 border-1 border-blue-700 rounded focus-within:outline-none">
                <input
                  
                  type={view ? "text" : "password"}
                  onChange={(e) => setpassword(e.target.value)}
                  name="password"
                  value={password}
                  className=" bg-transparent focus-within:outline-none"
                  placeholder="Password"
                />
                <button
                  className=""
                  onClick={(e) => {
                    e.preventDefault();
                    setview(!view);
                  }}
                >
                  <img
                    width={20}
                    src={require(view
                      ? "../assest/view.png"
                      : "../assest/hide.png")}
                    alt="logo"
                  />
                </button>
              </div>
              <div className="block my-3 p-2 border-1 border-blue-700 rounded focus-within:outline-none">
                <input
                  type={view1 ? "text" : "password"}
                  onChange={(e) => setconfirmpassword(e.target.value)}
                  name="password"
                  value={confirmpasword}
                  className=" bg-transparent focus-within:outline-none"
                  placeholder="Confirm Password"
                />
                <button
                  className=""
                  onClick={(e) => {
                    e.preventDefault();
                    setview1(!view1);
                  }}
                >
                  <img
                    width={20}
                    src={require(view1
                      ? "../assest/view.png"
                      : "../assest/hide.png")}
                    alt="logo"
                  />
                </button>
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  setshowchangepassword(false);
                }}
                className="bg-blue-600 hover:bg-blue-700 p-2 px-3 rounded text-white mx-auto w-fit flex "
              >
                Change password
              </button>
            </div>
            <div>
              <p
                onClick={() => navigate("/login")}
                className="cursor-pointer text-center  hover:underline  text-blue-600 "
              >
                Remember Password ?{" "}
                <span className="underline text-blue-800">Log in</span>
              </p>
            </div>
          </form>
        </Col>
      </Row>
    </div>
  );
};

export default Forgot;
