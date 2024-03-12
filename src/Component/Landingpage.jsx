import React from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

const Landingpage = () => {
    let navigate=useNavigate()
  return (
    <div>
      {/* Navbar*/}
      <div className="flex container justify-between p-3">
        {/* <img src="/public/assest" alt="" /> */}
        <h2>LOGO</h2>
        <div>
          <button onClick={()=>navigate("/login")} className="p-2 px-3 text-blue-500 bg-slate-50 hover:bg-slate-100 border-blue-500 mx-2 border-1 rounded ">
            Log in
          </button>
          <button onClick={()=>navigate('/signup')} className="p-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded mx-2">
           Sign up
          </button>
        </div>
      </div>
      {/* Navbar over */}
      {/* Banner 1 */}
      <Row className="container mx-auto min-h-[86vh] align-items-center">
        <Col md={6} >
            <h1 className="text-3xl">
                You can now automate stratergies
            </h1>
            <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum aperiam maiores voluptatibus placeat facilis culpa sequi accusamus a repellendus? Quas, rerum ut commodi officia ullam voluptas sit corporis hic quae asperiores velit perspiciatis! Vel minus vero nam magni beatae. Sunt?
            </p>
        <button  onClick={()=>navigate('/signup')}  className="p-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded mx-2">
            Signup for free!
          </button>
        </Col>
        <Col md={6} >
           <img className="rounded " src={require("../assest/orderbooking.webp")} alt="" />
        </Col>
      </Row>
    </div>
  );
};

export default Landingpage;
