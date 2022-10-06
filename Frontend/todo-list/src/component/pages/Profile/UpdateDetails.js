import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getuserdetails } from '../../react-redux/userAction'

function UpdateDetails() {
    // const dispatch = useDispatch()
    // const userdetails = useSelector(state => state.profile)
    //   const { user } = userdetails

    const [User, SetUser] = useState({
        Name: ''
    })



    useEffect(() => {

        getsingledata()
        // dispatch(getuserdetails())
    }, [])


    const getsingledata = async (id) => {
        try {

            // else{
            const config = { headers: { 'Content-Type': 'application/json' } }
            const { data } = await axios.get('http://localhost:27017/api/User/profile', { withCredentials: true }, config)
            console.log(data.Name)
            SetUser({
                Name: data.Name
            })
        }
        // }
        catch (error) {
            SetUser(error)
            console.log(error)
            console.log(error.status)
        }
    }

    const handelchange = (e) => {
        const name = e.target.name
        const value = e.target.value
        SetUser({ ...User, [name]: value })
    }


    const postdata = async (e) => {
        e.preventDefault();
        try {
            console.log(User.Name)
           
            const config = { headers: { 'Content-Type': 'application/json' } }
            const data = await axios.put("http://localhost:27017/api/User/userdetails", User, { withCredentials: true }, config)
            console.log(data)
            //   Navigate('/')
        } catch (error) {
            console.log(error)
        }

    }







    return (
        <><div className="container py-5 h-100">
            <div className="row d-flex align-items-center justify-content-center h-100">
                <div className="col-md-8 col-lg-7 col-xl-6">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                        className="img-fluid" alt="Phone image" />
                </div>


                <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                    <form>

                        <div> <h1>Update your details</h1></div>
                        {/* <-- Name input--> */}
                        <div className="form-outline mb-4">
                            <input name="Name" type="text" placeholder="Enter your Name" value={User.Name} onChange={handelchange} className="form-control form-control-lg" />
                            <label className="form-label" >Name</label>
                        </div>

                        {/* <!-- Submit button --> */}
                        <button type="submit" className="btn btn-primary btn-lg btn-block" onClick={postdata}>Update</button>



                    </form>
                </div>
            </div>
        </div >
        </>
    )
}

export default UpdateDetails