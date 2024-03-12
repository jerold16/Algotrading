import React, { useState } from 'react'
import Navbar from './Navbar'
import { Route, Routes } from 'react-router'
import Dashboard from './Dashboard'
import Stratergy from './Stratergy'
import Borker from './Borker'
import Settings from './Settings'
import MobileNavbar from './MobileNavbar'
const Welcomepage = () => {
  const [active,setactive]=useState("")
  const [data,setdata]=useState([])

  return (
    <div className='lg:flex'>
    <Navbar active={active} />
    <MobileNavbar active={active}/>
    <div className='flex-1'>
          <Routes>
            <Route path='/*' element={<Dashboard data={data} setactive={setactive} />}/>
            <Route path='/strategy' element={<Stratergy setdata={setdata} setactive={setactive}/>}/>
            <Route path='/broker' element={<Borker setactive={setactive} />}/>
            <Route path='/settings' element={<Settings setactive={setactive} />}/>
          </Routes>
        </div>
    </div>
  )
}

export default Welcomepage