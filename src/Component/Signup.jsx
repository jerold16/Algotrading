import axios from 'axios'
import React, { useState } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { hostname } from '../App'

const Signup = () => {
  let navigate = useNavigate()
  let [view, setview] = useState(false)
  let [view1, setview1] = useState(false)
  let [show, setshow] = useState(false)
  let [errorMessage,setErrorMessage]=useState()
  let [user, setuser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: ""
  })
  let signUp = (e) => {
    e.preventDefault()
    console.log(user);
    if (enterOtp == reccievedOtp)
      axios.post(`${hostname}/SignInUserAPIView/`, {
        username: `${user.firstname + " " + user.lastname}`,
        email: user.email,
        phone_number: user.phone,
        password: user.password
      }).then((res) => {
        console.log(res.data);
        setshow(false)
        navigate('/login')
      }).catch((error) => {
        console.log(error);
      })
  } 
  let handlechange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setuser((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  let [reccievedOtp, setResivedOTP] = useState()
  let [enterOtp, setEnterOtp] = useState()
  let otpVerification = (e) => {
    e.preventDefault()
    if (user.email != null && user.firstname != null && user.password != null)
      axios.post(`${hostname}/EmailverifyOTP/`, { Email: user.email }).then((response) => {
        setResivedOTP(response.data.otp)
        alert('OTP has been sended to your Email')
        setErrorMessage('')
        setshow(true)
      }).catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.message)
      })

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
                <input onChange={handlechange} className=" bg-transparent my-2 p-2 border-1 border-blue-700 rounded focus-within:outline-none"
                  type="text" name='firstname' placeholder='First name' />
                <input className=" bg-transparent my-2 p-2 border-1 border-blue-700 rounded focus-within:outline-none"
                  type="text" onChange={handlechange} name='lastname' placeholder='Last name' />
              </div>
              <input
                type="text"
                onChange={handlechange}
                name="email"
                value={user.email}
                className="block w-full bg-transparent my-3 p-2 border-1 border-blue-700 rounded focus-within:outline-none"
                placeholder="Email address"
              />
              <input type="number" onChange={handlechange} name='phone' className="block w-full  bg-transparent my-3 p-2 border-1 border-blue-700 rounded focus-within:outline-none"
                placeholder='phone' />
              <div className=" my-3 p-2 border-1 border-blue-700 rounded focus-within:outline-none">
                <input
                  id="passwordinput"
                  type={view ? "text" : "password"}
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
                  type={view1 ? "text" : "password"}
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
              <p className='text-red-600 h-[25px]'>{errorMessage} </p>
              <button onClick={otpVerification} className="bg-blue-600 hover:bg-blue-700 p-2 px-3 rounded text-white mx-auto w-fit flex ">
                Register
              </button>
            </div>
            <div className='mt-3'>
              <p onClick={() => navigate('/login')} className="cursor-pointer  hover:underline  text-blue-600 ">
                Already have a account ?{" "}
                <span className="underline text-blue-800">Log in</span>
              </p>
            </div>
          </form>
        </Col>
      </Row>

      {
        show && <Modal show={show} onHide={() => setshow(false)}>
          <Modal.Header>
            Otp Verification
          </Modal.Header>
          <Modal.Body>
            Enter the otp
            <input type='text' onChange={(e) => setEnterOtp(e.target.value)} placeholder='123456' className='p-2 px-3 bg-slate-50 rounded outline-none ' />

          </Modal.Body>
          <Modal.Footer>
            <button onClick={signUp} className='bg-blue-600 text-white rounded p-2 px-3'>Confirm </button>
            <button onClick={otpVerification} className='bg-red-600 text-white rounded p-2 px-3'>Generate Otp </button>


          </Modal.Footer>
        </Modal>

      }

    </div>
  )
}

export default Signup