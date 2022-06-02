import React from 'react'
import './SignInSignUp.css';

import axios from "axios";


function SignInSignUp() {
  var loginEmail = "";
  var loginPwd = "";

  // login, saving jwt to local storage
  function submitLogin(e) {
    e.preventDefault(); 
    axios.post("/login",
      {
        email: loginEmail,
        password: loginPwd
      })
      .then(res => {
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("token", res.data.access_token);
        window.location.href = "/";
      })
      .catch(err => {
        console.log(err)
        alert(err.response.data.msg);
      })
  }

  var username = ""
  var signupEmail = ""
  var signupPwd = ""
  var confirmPwd = ""

  // register, double check password 
  function register(e) {
    e.preventDefault();
    if (signupPwd != confirmPwd) {
      window.alert("The passwords do not match")
    } else {
    axios.post("/register",
      {
        username: username,
        email: signupEmail,
        password: signupPwd,
      })
      .then(res => {
        alert(res.data.msg);
        window.location.href = "/login";
      })
      .catch(err => {
        alert(err.response.data.msg);
      })
    }
  }
  return (

    <div>
      <div className='center'>
        <p className='welcomeBox'>Welcome to NER</p>
      </div>

      <h1 class="orLine"><span>OR</span></h1>

      <div class="container">
        <div class="row">
          <div class="col">
            <div className='logInOutContainer'>
              <form method="post">
                <div className='center'>
                  <p className='headerFont'>Sign in to your account</p>
                </div>
                <div className='mb-3'>
                  <input type='text' class="form-control" placeholder="Email Adress" onChange={(event) => loginEmail = event.target.value} />
                </div>
                <div className='mb-3'>
                  <input type='password' class="form-control" placeholder="Password" onChange={(event) => loginPwd = event.target.value} />
                </div>
                <div className='center'>
                  <button type="submit" class="btn loginAndRegisBut" onClick={submitLogin}>SIGN IN</button>
                </div>
              </form>
            </div>
          </div>
          <div class="col">
            <div className='logInOutContainer'>
              <form method="post">
                <div className='center'>
                  <p className='headerFont'>Create Account</p>
                </div>
                <div className='mb-3'>
                  <input type='text' class="form-control" placeholder="Username" onChange={(event) => username = event.target.value} />
                </div>
                <div className='mb-3'>
                  <input type='email' class="form-control" placeholder="Email Adress" onChange={(event) => signupEmail = event.target.value} />
                </div>
                <div className='mb-3'>
                  <input type='password' class="form-control" placeholder="Password" onChange={(event) => signupPwd = event.target.value} />
                </div>
                <div className='mb-3'>
                  <input type='password' class="form-control" placeholder="Confirm Password" onChange={(event) => confirmPwd = event.target.value} />
                </div>
                <div className='center'>
                  <button type="submit" class="btn loginAndRegisBut" onClick={register}>SIGN UP</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default SignInSignUp