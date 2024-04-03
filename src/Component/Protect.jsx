import React from 'react'
import Login from './Login'

const Protect = ({Child}) => {
    let user=sessionStorage.getItem("user")
  return (
    <div>
      {
        user!=undefined&&user!=null ? <Child/> : <Login/>
      }
    </div>
  )
}

export default Protect