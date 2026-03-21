import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from '../utils/userSlice';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants"

const Login = () => {

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginFrom] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId,
        password,
      }, { withCredentials: true });
      // console.log(res.data);
      dispatch(addUser(res.data));
      return navigate("/")
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      // console.error(err);
    }
  }

  const handleSignUp = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup", {firstName, lastName, emailId, password}, {withCredentials: true});
      // console.log(res.data)
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (error) {
      setError(err?.response?.data || "Something went wrong");
      // console.error(err);
    }
  }

  return (
    <div className='flex justify-center my-10'>
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm ? "Login" : "SignUp"}</h2>
          <div>
            {
              !isLoginForm && (
                <>
                  <fieldset className="fieldset my-2">
                    <legend className="fieldset-legend">First Name</legend>
                    <input
                      type="text"
                      className="input"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </fieldset>
                  <fieldset className="fieldset my-2">
                    <legend className="fieldset-legend">Last Name</legend>
                    <input
                      type="text"
                      className="input"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </fieldset>

                </>
              )
            }
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
                className="input"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <p className='text-red-500'>{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary m-2" onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? "Login" : "Sign Up"}</button>
          </div>
          <p className='m-auto cursor-pointer' onClick={() => setIsLoginFrom((value) => !value)}>{isLoginForm ? "New User? Signup here" : "Existing User? Login here"}</p>
        </div>
      </div>
    </div>
  )
}

export default Login