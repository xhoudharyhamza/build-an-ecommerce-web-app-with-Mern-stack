import React, { useContext, useLayoutEffect } from 'react'
import { ProductsContext } from './GlobalState/Context'
import {useNavigate} from "react-router-dom"
const Logout = () => {
  let navigate= useNavigate()
  let {dispatch}= useContext(ProductsContext)
  let logoutUser= async ()=>{
    let res= await fetch('/accounts/logout', {
      method:"GET",
      credentials: 'include'
    })
    if(res.status===200){
      dispatch({type:"SET_USER", payload:null})
      navigate("/accounts/login")
    }
  }
  useLayoutEffect(()=>{
    logoutUser()
  }, [])
  return (
    <>
    <div className="logout-message">
      <p>User is logged out successfully!</p>
    </div>
      </>
  )
}

export default Logout