import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'

const Signup = () => {
    let navigate=useNavigate()
    let [view,setview]=useState(false)
    let [view1,setview1]=useState(false)

    let [user,setuser]=useState({
        firstname:"",
        lastname:"",
        email:"",
        phone:"",
        password:"",
        confirmpassword:""
    })
    let handlechange=(e)=>{
        e.preventDefault();
        const {name,value}=e.target;
        setuser((prev)=>({
            ...prev,
            [name]:value
        }))


    }
  return (
    <div className='min-h-[100vh] flex'>
        <Row className='container mx-auto my-auto'>
        <Col md={6} className=' my-4'>    
        <h1 className="text-lg sm:text-3xl">Simplify your trading experience with our automated platform</h1>
          <img src={require("../assest/6256458.jpg")} alt="Trade Chart" />
        </Col>
        <Col md={6} className='my-4  p-2'>
          <form
            action=""
            className="bg-slate-50 md:w-fit min-h-[500px] 
            flex flex-col justify-between mx-auto shadow-lg p-4 "
          >
            <h4 className="text-blue-600 text-2xl  text-center">
              Create your Account
            </h4>
            <div className="mx-auto">
                <div className='flex  flex-col flex-lg-row gap-2'>
                    <input className=" bg-transparent my-2 p-2 border-1 border-blue-700 rounded focus-within:outline-none"
                type="text" name='firstname' placeholder='First name' />
                    <input className=" bg-transparent my-2 p-2 border-1 border-blue-700 rounded focus-within:outline-none"
                 type="text" name='lastname' placeholder='Last name' />
                </div>
              <input
                type="text"
                onChange={handlechange}
                name="email"
                value={user.email}
                className="block w-full bg-transparent my-3 p-2 border-1 border-blue-700 rounded focus-within:outline-none"
                placeholder="Email address"
              />
              <input type="number" className="block w-full  bg-transparent my-3 p-2 border-1 border-blue-700 rounded focus-within:outline-none"
                placeholder='phone' />
              <div className=" my-3 p-2 border-1 border-blue-700 rounded focus-within:outline-none">
                <input
                  id="passwordinput"
                  type={view ? "text":"password"}
                  onChange={handlechange}
                  name="password"
                  value={user.password}
                  className="lg:w-11/12 bg-transparent focus-within:outline-none"
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
              <div className="block my-3 p-2 border-1 border-blue-700 rounded focus-within:outline-none">
                <input
                  id="passwordinput"
                  type={view1 ? "text":"password"}
                  onChange={handlechange}
                  name="confirmpassword"
                  value={user.confirmpassword}
                  className="lg:w-11/12 bg-transparent focus-within:outline-none"
                  placeholder="Confirm Password"
                />
                <button className=""
                  onClick={(e) => {
                    e.preventDefault()
                    setview1(!view1)
                  }}
                >
                  <img width={20} src={require(view1 ? "../assest/view.png" : "../assest/hide.png")} alt="logo" />
                </button>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 p-2 px-3 rounded text-white mx-auto w-fit flex ">
                Register
              </button>
            </div>
            <div>
             
              <p onClick={()=>navigate('/login')} className="cursor-pointer  hover:underline  text-blue-600 ">
               Already have a account ?{" "}
                <span className="underline text-blue-800">Log in</span>
              </p>
            </div>
          </form>
        </Col>
        </Row>

    </div>
  )
}

export default Signup