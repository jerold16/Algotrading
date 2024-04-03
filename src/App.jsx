import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Landingpage from './Component/Landingpage'
import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Component/Login';
import Forgot from './Component/Forgot';
import Signup from './Component/Signup';
import Stratergy from './Component/Stratergy';
import './Component/style.css'
import Welcomepage from './Component/Welcomepage';
import Protect from './Component/Protect';
export const hostname='http://192.168.0.103:9000'

export const primarybg='bg-slate-100'
export const secondrybg='bg-slate-100'
const App = () => {
  return (
    <BrowserRouter>
       <Routes>
          <Route path='/' element={<Landingpage/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/forgot' element={<Forgot/>} />
          <Route path='/welcome/*' element={<Protect Child={Welcomepage}/>}/>
          <Route path='/signup' element={<Signup/>} />
       </Routes>
    </BrowserRouter>
  )
}

export default App