import React, { useEffect, useState } from 'react'
import './Profile.css'
import { useDispatch, useSelector } from 'react-redux'
import { getuserdetails } from '../../react-redux/userAction'
import { Link, useNavigate } from 'react-router-dom';
import Login from '../Login/Login'
// import axios from 'axios';



function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userdetails = useSelector(state => state.profile)
  const { loading, user, error } = userdetails
  
  // console.log(user)
  // console.log(user.status)
  // console.log(user.data)


  const [User, setUser] = useState({})



  // console.log(User)



  useEffect(() => {
    // if (user.status===200) {
    dispatch(getuserdetails())
    // getdetalis()
    // }
    // else{
    //   navigate('/login')

  }, [dispatch])


  // const getdetalis = async(e) => {
  //   e.preventDefault();
  //   try {
  //     const config = { headers: { 'Content-Type': 'application/json' } }
  //     const data = await axios.get('http://localhost:27017/api/User/profile', { withCredentials: true }, config)
  //     console.log(data)
  //     setUser(data)

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }







  return (<>
    {loading ? (<h1>loading...</h1>) : error ? (navigate('/login')) :
      (<>
        <div className="container-fluid py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100 ">
            <div className="col col-lg-6 mb-4 mb-lg-0">
              <div className="card mb-3" >
                <div className="row g-0">
                  <div className="col-md-4 gradient-custom text-center text-black border">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="Avatar" className="img-fluid my-5" style={{ width: "80px" }} />
                    <h5>{User.Name}</h5>
                    <p>Web Designer</p>
                    <i className="far fa-edit mb-5"></i>
                  </div>

                  {/* This is the information right side container  */}
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <h6>Information</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Email</h6>
                          <p className="text-muted">{user.Email}</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Name</h6>
                          <p className="text-muted">{user.Name}</p>
                        </div>
                      </div>
                      <Link to='/updatedetails'><button type='btn' className='btn btn-primary mb-3'>Edit Details</button></Link>


                    </div>
                    <hr className="mt-0 mb-4" />
                    <Link to='/addtask'><button type='btn' className='btn btn-primary mb-3'>Add more work</button></Link>


                    {/* <form className="row g-3">
                  <div className="col-auto">
                    <label  className="visually-hidden">Email</label>
                    <input type="text" readonly className="form-control-plaintext"  value="Description"/>
                  </div>
                  <div className="col-auto">
                    <label  className="visually-hidden">Email</label>
                    <input type="text" readonly className="form-control-plaintext"  value="category"/>
                    <button type="submit" className="btn btn-primary mb-3">Delete work</button>
                  </div>
                </form> */}
                  </div>
                </div>
              </div>
            </div >
          </div >
        </div >


      </>)}
  </>
  )
}

export default Profile