import React, { useEffect } from 'react'
import Timer from './Timer'
import { useNavigate } from 'react-router'
import { arrydata } from './Data'

const Dashboard = (props) => {
    let {setactive,data}=props
    let navigate=useNavigate()
    let strageycount=[
      {
        name: "Total Strategies",
        count:data.length
      },
      {
        name: "Active Strategies",
        count:data.length
      },
      {
        name: "Running Strategies",
        count:data.length
      }
    ]
    useEffect(()=>{
        setactive("dashboard")
    },[])
  return (
    <div className='container-fluid'>
      <div className='min-h-[10vh]  border-b sticky-top justify-between flex flex-col flex-sm-row items-center px-3 '>
        <article className=' d-none d-sm-flex gap-2 items-center'>
          <p className='mb-0 rounded-full w-[40px] h-[40px] flex align-items-center p-2 border-blue-700 border-3  '> JR</p>
          <p className='mb-0'>Welcome Jerold raja </p>
        </article>
       <p className='mb-0 text-xl fw-semibold'>Dashboard</p>
        <Timer/>
      </div>
      {/* Section 2  */}
      <article className='min-h-10vh row px-3 border-b py-2 items-center flex '>
        <div className='h-fit flex col-sm-3 my-2 justify-between'>
          <div className='uppercase mx-3'>
              Total PNl
              <span className='text-green-600 block'>0/-</span>
          </div>
          <div className='mx-3 uppercase'>
              Total order
              <span className='text-slate-600 block'>0</span>
          </div>
        </div>
        <div className='col-sm-9 my-2 flex-wrap items-center flex justify-around '>
          <div className='flex my-2 '>
            <select name="typeofstrategy" className='appearance-none outline-none text-blue-800 text-decoration-underline underline-offset-4 ' id="">
              <option value="Total Strategies">Total Strategies :</option>
              <option value="Active Strategies">Active Strategies :</option>
              <option value="Running Strategies">Running Strategies :</option>
            </select>

            <p className='mb-0 text-lg fw-semibold text-slate-500 '>3 </p>

          </div>
          {/* Search button */}
          <div className='rounded mx-2 text-slate-400 my-3 flex gap-2 px-2 p-1  border-2 border-slate-400 w-fit'>
          <input type="text" placeholder='Search strategy' className='outline-none' />
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>
          </div> 
          <button className='border-1 mx-2 border-blue-600 p-2 px-3 rounded hover:bg-slate-100 text-blue-500' onClick={()=>navigate('/welcome/strategy')}>Create new </button>
          
        </div>


      </article>
      
        

    </div>
  )
}

export default Dashboard