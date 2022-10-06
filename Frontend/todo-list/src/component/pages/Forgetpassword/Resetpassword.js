import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Resetpassword = () => {

    const navigate = useNavigate();

    const [user, Setuser] = useState({
        otp: "", Password: "", Confirm_New_Password: ""
    })



    const haandelchange = (e) => {
        const name = e.target.name
        const value = e.target.value
        Setuser({ ...user, [name]: value })
    }



    const postdata = async (e) => {
        e.preventDefault();
        try {
            if (user.otp) {
                if (user.Password === user.Confirm_New_Password) {
                    const updatedata = await axios.post("http://localhost:27017/api/User/reset-password", user, { withCredentials: true })
                    // console.log(updatedata)
                    if (updatedata.status === 200) {
                        alert("your password succesfully reset")
                        navigate("/login")
                      } else if (updatedata.status === 201) {
                        alert("this code is not valid")
                      }
                } else {
                    alert("Password should be same")
                }
            } else {
                alert("Enter your detalis")
            }
        } catch (error) {
            console.log(error)
        }
    }






    return (<>

        <div class='container forget'>
            <form>
                {/* otp input */}
                <div class="form-outline mb-4">
                    <input name="otp" type="text" value={user.otp} onChange={haandelchange} class="form-control" />
                    <label class="form-label" >Code</label>
                </div>

                {/* otp input */}
                <div class="form-outline mb-4">
                    <input name="Password" type="text" value={user.Password} onChange={haandelchange} class="form-control" />
                    <label class="form-label" >New Password</label>
                </div>

                {/* otp input */}
                <div class="form-outline mb-4">
                    <input name="Confirm_New_Password" type="text" value={user.Confirm_New_Password} onChange={haandelchange} class="form-control" />
                    <label class="form-label" >Confirm New Password</label>
                </div>

                <div class="row mb-4">
                    <div class="col d-flex justify-content-center">
                        {/* <!-- Checkbox --> */}
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                            <label class="form-check-label" for="form2Example31"> Remember me </label>
                        </div>
                    </div>

                    <div class="col">
                        <Link to='/login'>sign in</Link>
                    </div>
                </div>

                {/* Submit button */}
                <button type="button" class="btn btn-primary mb-4 button" onClick={postdata}>update password</button>

            </form>
        </div >
    </>
    )
}
