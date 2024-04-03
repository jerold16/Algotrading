import React, { useEffect, useState } from 'react'
import Timer from './Timer'
import axios from 'axios'
import { hostname } from '../App'

const Settings = (props) => {
    let [edit,setedit]=useState(false)
    let [userdata,setuser]=useState()
    let user=JSON.parse(sessionStorage.getItem('user'))
    let {setactive}=props
    useEffect(()=>{
        setactive('settings')
        axios.post(`${hostname}/Userdetails/`, {
          user_id: user
        }).then((response) => {
          console.log(response.data);
          setuser(response.data.user)
        }).catch((error) => { console.log(error); })
    },[])
  return (
    <div>
      {
        userdata!=undefined ?  <>
      
        <div className='min-h-[10vh] border-bottom flex justify-between xl:px-10 items-center px-6 '>
            <p className='mb-0'>Settings</p>
            <Timer/>
        </div>
        <div className='w-[30rem] mx-auto my-2 shadow p-4 '>
            <div className='flex justify-between items-center '>
                <p className='fw-semibold  '>{edit ? "Edit profile" : "Contact details"}</p>
                <div onClick={()=>setedit(!edit)} className='flex cursor-pointer text-blue-800 items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
</svg>  <p className='mb-0 text-black' >Edit</p>
{/* <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
</svg> */}
                </div>
            </div>
            {/* Edit page */}
            <div className={`w-fit  mx-auto ${edit? 'd-block':'d-none' }`}>
                <div className='my-2'>
                    Username
                    <div className='border flex items-center gap-3 p-1 px-3 rounded border-blue-500 text-blue-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>  <input className='text-slate-900 outline-none  ' type="text" placeholder='' value={userdata.username} />
                    </div>
                </div>
                <div className='my-2'>
                    Email-id
                    <div className='border flex items-center gap-3 p-1 px-3 rounded border-blue-500 text-red-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
</svg>  <input className='text-slate-900 outline-none  ' type="text" placeholder='' value={userdata.email} />
                    </div>
                </div>
                <div className='my-2'>
                    Phone Number
                    <div className='border flex items-center gap-3 p-1 px-3 rounded border-blue-500 text-blue-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
</svg> <input className='text-slate-900 outline-none  ' type="text" placeholder='' value={userdata.phone_number} />
                    </div>
                </div>
            </div>
            <div className={`w-fit ms-auto  ${edit? 'd-block':'d-none' }`}>
                <button onClick={()=>setedit(!edit)} className='text-blue-700 border-blue-700 mx-1 shadow p-1 px-4 border-1 rounded'> Cancel</button>
                <button className='text-slate-50 mx-1 bg-blue-700 shadow p-1 px-4 border-1 rounded'> Save</button>
            </div>
            {/* non edit mode */}
            <div className={`w-fit  mx-auto ${edit? 'd-none':'d-block' }`}>
                <div className='flex items-center my-4 text-blue-700 gap-3'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg> <p className='mb-0 text-black'>Name: <span className='fw-semibold'> {userdata.username} </span> </p>
                </div>
                <div className='flex items-center my-4 text-red-700 gap-3'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
</svg> <p className='mb-0 text-black'>Email-id : <span className='fw-semibold'> {userdata.email} </span> </p>
                </div>
                <div className='flex items-center my-4 text-blue-700 gap-3'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
</svg> <p className='mb-0 text-black'>Phone Number : <span className='fw-semibold'>{userdata.phone_number} </span> </p>
                </div>

            </div>

        </div>
       </> : ''
        }
    </div>
  )
}

export default Settings