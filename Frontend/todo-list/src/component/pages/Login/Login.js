import axios from "axios"
import React, { useEffect, useState } from "react"
import {loginAction} from "../../react-redux/userAction"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch,useSelector } from "react-redux"
import './Login.css'


function Login() {
    const dispatch = useDispatch();
    const userlogin = useSelector(state => state.login)
    const {loading, user, error } = userlogin

    
    const navigate = useNavigate()

  const [User, SetUser] = useState({
     Email: '', Password: ''
  })

  useEffect(() => {
  if (user.token) {
    navigate("/")
}
}, [user, error, navigate])

  const handelchange = (e) => {
    const name = e.target.name
    const value = e.target.value
    SetUser({ ...User, [name]: value })
  }


  const postdata = async (e) => {
    e.preventDefault();
    try {
        e.preventDefault();
        if (!User.Email && !User.Password) {
            alert("please enter valid username and Password")
        } else {
            dispatch(loginAction(User.Email, User.Password))
        
        }
    } catch (error) {
      console.log(error)
    }

  }
        
    return (
        <>
        {loading ? (<h1>loading...</h1>) : 
        (<>
            <div className="container py-5 h-100">
                <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-8 col-lg-7 col-xl-6">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            className="img-fluid" alt="Phone image" />
                    </div>


                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <form>
                            {/* <!-- Email input --> */}
                            <div> <h1>Login Page</h1></div>
                            <div className="form-outline mb-4">
                                <input name="Email" type="text" placeholder="Enter your Email" value={User.Email} onChange={handelchange} className="form-control form-control-lg" />
                                <label className="form-label" >Email address</label>
                            </div>


                            {/* <!-- Password input --> */}
                            <div className="form-outline mb-4">
                                <input name="Password" type="text" placeholder="Enter your password" value={User.Password} onChange={handelchange} className="form-control form-control-lg" />
                                <label className="form-label" >Password</label>
                            </div>

                            <div className="d-flex justify-content-around align-items-center mb-4">
                                {/* <!-- Checkbox --> */}
                                 <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="form1Example3" checked />
                                        <label className="form-check-label" > Remember me </label>
                                    </div>
                                    <Link to='/forgetpassword'>Forgot password?</Link>
                                </div> 

                                {/* <!-- Submit button --> */}
                             <button type="submit" className="btn btn-primary btn-lg btn-block" onClick={postdata}>Sign in</button>

                             <Link to='/signup'> <button type="btn" className="btn btn-primary btn-lg btn-block mx-3">Sign up</button> </Link>


                        </form>
                    </div>
                </div>
            </div >
        </>)}
        </>
    )
}


export default Login