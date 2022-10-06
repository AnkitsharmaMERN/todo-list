import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch} from "react-redux" 
import {registration} from "../../react-redux/userAction"


function Registration() {
  const Navigate = useNavigate()
  const dispatch= useDispatch();

  const [User, SetUser] = useState({
    Name: '', Email: '', Password: '', confirm_Password: ''
  })

  const handelchange = (e) => {
    const name = e.target.name
    const value = e.target.value
    SetUser({ ...User, [name]: value })
  }


  const postdata = async (e) => {
    e.preventDefault();
    try {
      if (User) {
        if (User.Password === User.confirm_Password) {
          dispatch(registration(User))
          // const config ={headers: {'Content-Type':'application/json'}}
          // const data = await axios.post("http://localhost:27017/api/User/signup", User, {withCredentials:true}, config)
          // console.log(data)
          SetUser({Name: '', Email: '', Password: '', confirm_Password: ''})
          Navigate('/')
        }
        else {
          alert("password and confirm password should be same")
        }
      }
      else{
        alert("please fill all your detalis" )
      }

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <>
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid" alt="Phone image" />
          </div>


          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form>

              <div> <h1>Registration Page</h1></div>
              {/* <-- Name input--> */}
              <div className="form-outline mb-4">
                <input name="Name" type="text" placeholder="Enter your Name" value={User.Name} onChange={handelchange} className="form-control form-control-lg" />
                <label className="form-label" >Name</label>
              </div>

              {/* <!-- Email input --> */}
              <div className="form-outline mb-4">
                <input name="Email" type="text" placeholder="Enter your Email" value={User.Email} onChange={handelchange} className="form-control form-control-lg" />
                <label className="form-label" >Email address</label>
              </div>


              {/* <!-- Password input --> */}
              <div className="form-outline mb-4">
                <input name="Password" type="text" placeholder="Enter your password" value={User.Password} onChange={handelchange} className="form-control form-control-lg" />
                <label className="form-label" >Password</label>
              </div>


              {/* <!-- Confirm Password input --> */}
              <div className="form-outline mb-4">
                <input name="confirm_Password" type="text" placeholder="Enter your re-password" value={User.confirm_Password} onChange={handelchange} className="form-control form-control-lg" />
                <label className="form-label" >Confirm password</label>
              </div>


              {/* <!-- Submit button --> */}
              <button type="submit" className="btn btn-primary btn-lg btn-block" onClick={postdata}>Sign up</button>

              <Link to='/login'> <button type="btn" className="btn btn-primary btn-lg btn-block mx-3">sign in</button> </Link>


            </form>
          </div>
        </div>
      </div >
    </>
  )
}

export default Registration