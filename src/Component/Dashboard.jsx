import React, { useEffect, useState } from 'react'
import Timer from './Timer'
import { useNavigate } from 'react-router'
import { arrydata } from './Data'
import axios from 'axios'
import { hostname, primarybg, secondrybg } from '../App'
import { Modal, Spinner } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

const Dashboard = (props) => {
  let { setactive, data } = props
  let navigate = useNavigate()
  let user = JSON.parse(sessionStorage.getItem('user'))
  let [userdata, setuserdata] = useState()
  let [strategy, setStrategy] = useState()
  let [showleg, setshowleg] = useState(-1)
  let [filteredStrategy,setFilterdStrategy]=useState()
  let [legDetails,setLegdetails]=useState()
  let [loading,setloading]=useState(true)
  let [seachloading,setsearchloading]=useState(true)

  let [showLegDetails,setShowLegDetails]=useState(false)
  let ActiveCall = (e, id) => {
    e.preventDefault()
    console.log({
      user_id: user,
      strategy_id: id,
      status: 'active'
    });
    axios.post(`${hostname}/StatusApiview/`, {
      user_id: user,
      strategy_id: id,
      status: 'active'
    }).then((response) => {
      getStrategy()
      console.log(response.data);
      SuccessMsg("Activated")
    }).catch((error) => {
      console.log(error);
    })
  }
  const SuccessMsg = (st) => {
    toast.success(st, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  let getStrategy = () => {
    axios.post(`${hostname}/RetrieveStrategyByUserId/`, {
      user_id: user
    }).then((response) => {
      console.log(response.data);
      setStrategy(response.data)
      setFilterdStrategy(response.data)
    }).catch((error) => {
      console.log(error);
    })
  }
  let filterArray=(e)=>{
    let value = e.target.value
    // let value='hellow'
    // alert('jello')
    setsearchloading(false)
      // setStrategy((prev)=>{
      //   prev.filter((obj)=> obj.strategy_name.toUpperCase()==value.toUpperCase())
      // })
      let filterarry= strategy.filter((obj)=> obj.strategy_name.toUpperCase().includes(value.toUpperCase()))
      console.log(filterarry);
      setFilterdStrategy(filterarry)
      setsearchloading(true)
  }
  useEffect(() => {
    setactive("dashboard")
    getStrategy()
    axios.post(`${hostname}/Userdetails/`, {
      user_id: user
    }).then((response) => {
      console.log(response.data);
      setuserdata(response.data.user)
    }).catch((error) => { console.log(error); })
  }, [])
  // Getting the Status of the Order from the Angel One
  let getstatus=(id)=>{
    setloading(false)
    axios.get(`${hostname}/IndividualOrderStatus/${id}`).then((response)=>{
      console.log(response.data);
      setLegdetails(response.data);
      setShowLegDetails(true)
      setloading(true)
    }).catch((error)=>{
        console.log(error);
      setloading(true)
    })
  }
  return (
    <div className={`container-fluid ${primarybg}  min-h-[100vh]`}>
      {
        strategy != undefined && userdata != undefined ? <>
          <ToastContainer />
          <div className='min-h-[10vh] rounded bg-slate-50 border-b sticky-top justify-between flex flex-col flex-sm-row items-center px-3 '>
            <article className=' d-none d-sm-flex gap-2 items-center'>
              <p className='mb-0 rounded-full w-[40px] h-[40px]  text-center p-1 border-blue-700 border-3  '> {userdata.username.slice(0, 1)} </p>
              <p className='mb-0'>Welcome {userdata.username} </p>
            </article>
            <p className='mb-0 text-xl fw-semibold'>Dashboard</p>
            <Timer />
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
              <div className='flex my-2 gap-3 '>


                <p className='mb-0 text-lg fw-semibold text-slate-500 '> Total Strategies : {strategy.length == 0 ? 'none' : `${strategy.length}`} </p>

                <p className='mb-0 text-lg fw-semibold text-slate-500 '> Active Strategies : {strategy.length == 0 ? 'none' : `${strategy.filter((x) => x.status == 'active').length}`} </p>
              </div>
              {/* Search button */}
              <div className='rounded mx-2 text-slate-400 my-3 flex gap-2 px-2 p-1  border-2 border-slate-400 w-fit'>
                <input onChange={(e)=>filterArray(e)}
                 type="text" placeholder='Search strategy' className='outline-none bg-transparent' />
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </div>
              <button className='border-1 mx-2 border-blue-600 p-2 px-3 rounded hover:bg-slate-100 text-blue-500' onClick={() => navigate('/welcome/strategy')}>Create new </button>

            </div>


          </article>
          {/* Display Strategy */}
          <div>
            {
             seachloading && filteredStrategy!=undefined ? filteredStrategy.map((x, index) => {
                return (
                  <>
                    <div className={`w-full min-h-[10vh] my-2 ${secondrybg} rounded shadow px-3 items-center justify-around flex flex-wrap gap-4`}>
                      <p className='m-0 flex-1'>Strategy Name : {x.strategy_name}</p>
                      <p className='m-0 flex-1'>
                        Number of Legs : <span>{x.legs.length} </span>
                      </p>
                      <button disabled={x.status=='active'? true : false} onClick={(e) => ActiveCall(e, x.strategy_id)} className={` ${x.status == 'active' ? 'bg-green-400' : 'bg-red-400'} text-white p-2 px-3 rounded `}>
                        {x.status == 'active' ? 'Active' : 'Inactive'}
                      </button>
                      {/* Full Screen */}
                      <button onClick={() => {
                        setshowleg((prev) => {
                          if (prev == index)
                            return -1
                          return index
                        })
                      }} className={`rounded-full p-3 bg-slate-50 w-fit`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-fullscreen" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707m0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707m-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707" />
                        </svg>
                      </button>
                    </div>
                    {/* Showing the Legs */}
                    <div className={`${showleg == index ? 'transition500 ' : 'd-none transition500'} `}>
                      <p>Legs Details</p>
                      {
                        x.legs.map((x) => {
                          return (
                            <div className='my-2 flex flex-wrap gap-3 border-b-2 pb-2 py-1 justify-around'>
                              <p className='m-0 p-2 px-3 bg-white rounded'>Option/symbol Name : {x.name} </p>
                              <p className='m-0 p-2 px-3 bg-white rounded'>Unique Order Id: {x.uniqueorderid} </p>
                              <p className='m-0 p-2 px-3 bg-white rounded'>Tradingsymbol : {x.tradingsymbol} </p>
                              <p className='m-0 p-2 px-3 bg-white rounded'>Transactiontype : {x.transactiontype} </p>
                              <p className='m-0 p-2 px-3 bg-white rounded'> Optiontype : {x.optiontype.toUpperCase()} </p>
                              <p className='m-0 p-2 px-3 bg-white rounded'> Expire Date : {x.expirydate} </p>
                              <p className='m-0 p-2 px-3 bg-white rounded'>Target : {x.triggerprice} </p>
                              <p className='m-0 p-2 px-3 bg-white rounded'>Stop Loss : {x.stoploss} </p>
                              <p className='m-0 p-2 px-3 bg-white rounded'>Entry Price : {x.price} </p>
                              <button onClick={()=> getstatus(x.uniqueorderid)} className='p-2 px-3 bg-blue-600 rounded text-white'>
                                {loading ? ' Get Status' :'Loading....'}</button>
                            </div>
                          )
                        }) 
                      }
                    </div>
                  </>
                )
              }) :  
              <div className='text-center flex h-[40vh]'>
               <p className='m-auto'>
               Loading.....
               </p>
              </div>
            }
          </div> 
          {
            legDetails!=undefined && 
            <Modal show={showLegDetails} centered onHide={()=>setShowLegDetails(false)} className='' >
                 <Modal.Header closeButton>
                    Leg Details
                 </Modal.Header>
                 <Modal.Body>
                  <p>
                  Status : {legDetails.data.status}
                  </p>
                  <p>
                  Reason : {
                    legDetails.data.text
                  }
                  </p>
                  


                 </Modal.Body>

            </Modal>
          }


        </> : <div className=" h-[90vh] flex">
          <Spinner className="m-auto" animation="grow" />

        </div>
      }


    </div>
  )
}

export default Dashboard