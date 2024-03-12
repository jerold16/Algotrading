import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landingpage from './Component/Landingpage'
import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Component/Login';
import Forgot from './Component/Forgot';
import Signup from './Component/Signup';
import Stratergy from './Component/Stratergy';
import './Component/style.css'
import Welcomepage from './Component/Welcomepage';
const App = () => {
  return (
    <BrowserRouter>
       <Routes>
          <Route path='/' element={<Landingpage/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/forgot' element={<Forgot/>} />
          <Route path='/welcome/*' element={<Welcomepage/>}/>
          <Route path='/signup' element={<Signup/>} />
          <Route path='/strategy' element={<Stratergy/>}/>
       </Routes>
    </BrowserRouter>
  )
}

export default App