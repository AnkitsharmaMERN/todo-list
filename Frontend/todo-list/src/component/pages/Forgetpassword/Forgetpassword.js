import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Forgetpassword.css'

const Forgetpassword = () => {
  const navigate = useNavigate();

  const [Email, SetEmail] = useState({})

  const haandelchange = (e) => {
    const name = e.target.name
    const value = e.target.value
    SetEmail({ ...Email, [name]: value })
  }

  const postdata = async (e) => {
    e.preventDefault()
    try {
      if (Email) {
        const sendmail = await axios.post("http://localhost:27017/api/User/Forget-password", Email, { withCredentials: true })
        // console.log(sendmail)
        if (sendmail.status === 200) {
          alert("check your mail reset link has been sent")
          navigate("/resetPassword")
        } else if (sendmail.status === 402) {
          alert("this mail is not exist")
        }
      } else {
        alert("Please enter your valid Email")
      }
    } catch (error) {
      console.log(error)
    }

  }


  return (<>

    <div class='container forget'>
      <form>
        {/* Email input */}
        <div class="form-outline mb-4">
          <input name="Email" type="text" value={Email.Email} onChange={haandelchange} class="form-control" />
          <label class="form-label" for="form2Example1">Email address</label>
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
        <button type="button" class="btn btn-primary mb-4 button" onClick={postdata}>Reset password</button>

        {/*  Register buttons  */}
        <div class="text-center">
          <p>Not a member? <Link to="/signup">Register</Link></p>
          <p>or sign up with:</p>
        </div>
      </form>
    </div>
  </>
  )
}

export default Forgetpassword