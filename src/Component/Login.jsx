import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

const Login = () => {
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  const [view,setview]=useState(false)
  const handlechange = (e) => {
    const { name, value } = e.target;
    setuser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  return (
    <div>
      <Row className="container mx-auto align-items-center min-h-[70vh] xl:min-h-[100vh]">
        <Col lg={6}>    
        <h1 className="text-lg sm:text-3xl">Simplify your trading experience with our automated platform</h1>
          <img src={require("../assest/6256458.jpg")} alt="Trade Chart" />
        </Col>
        <Col lg={6}>
          <form
            action=""
            className="bg-slate-50 w-fit min-h-[400px] flex flex-col justify-between mx-auto shadow-lg p-4 "
          >
            <h4 className="text-blue-600 text-2xl  text-center">
              LogIn your Account
            </h4>
            <div className="w-fit mx-auto">
              <input
                type="text"
                onChange={handlechange}
                name="email"
                value={user.email}
                className="block w-full bg-transparent my-3 p-2 border-1 border-blue-700 rounded focus-within:outline-none"
                placeholder="Email address/phone"
              />
              <div className="block my-3 p-2 border-1 border-blue-700 rounded focus-within:outline-none">
                <input
                  id="passwordinput"
                  type={view ? "text":"password"}
                  onChange={handlechange}
                  name="password"
                  value={user.password}
                  className=" bg-transparent focus-within:outline-none"
                  placeholder="Password"
                />
                <button className=""
                  onClick={(e) => {
                    e.preventDefault()
                    setview(!view)
                  }}
                >
                  <img width={20} src={require(view ? "../assest/view.png" : "../assest/hide.png")} alt="logo" />
                </button>
              </div>
              <button onClick={()=>navigate('/welcome/')} className="bg-blue-600 hover:bg-blue-700 p-2 px-3 rounded text-white mx-auto w-fit flex ">
                Register
              </button>
            </div>
            <div>
              <p onClick={()=>navigate('/forgot')} className="cursor-pointer  hover:underline  text-blue-600 ">
                Forgot Password?
              </p>
              <p  onClick={()=>navigate('/signup')}  className="cursor-pointer  hover:underline  text-blue-600 ">
                Don't have an account ?{" "}
                <span className="underline text-blue-800">Register Here</span>
              </p>
            </div>
          </form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
