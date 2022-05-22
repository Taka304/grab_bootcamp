import React from 'react'
import './SignInSignUp.css';
// import axios from "axios";



function SignInSignUp() {
  var loginEmail= "";
  var loginPwd = "";

  function submitLogin(e) {
      e.preventDefault();
      console.log(loginEmail);
      console.log(loginPwd);
      // axios.post("/user/authenticate", 
      //   {
      //       userName: loginEmail,
      //       password: loginPwd
      //   })
      //   .then(res => {
      //       localStorage.setItem("loginEmail", loginEmail);
      //       setAuth(true);
      //   })
      //   .catch(err => {
      //       alert(err);
      //   })
  }

  var username = ""
  var signupEmail = ""
  var signupPwd = ""
  var confirmPwd = ""

  function register(e) {
      e.preventDefault();
      // axios.post("/user/add-user", 
      // {
      //     userName: username,
      //     email: signupEmail,
      //     password: signupPwd,

      // })
      // .then(res => {
      //     alert("Sign Up Successful");
      //     window.location.href = "/login";
      // })
      // .catch(err => {
      //     alert(err);
      // })
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
                  {/* <label className='labelForm' ><span className='star'>*</span>Email Adress</label> */}
                  <input type='text' class="form-control" placeholder="Email Adress"  onChange={(event) => loginEmail = event.target.value} />
                </div>
                <div className='mb-3'>
                  {/* <label className='labelForm'><span className='star'>*</span>Password</label> */}
                  <input type='password' class="form-control" placeholder="Password" onChange={(event) => loginPwd = event.target.value}/>
                </div>
                <div className='center'>
                  <button type="submit" class="btn loginAndRegisBut" onClick={submitLogin}>SIGN IN</button>
                </div>
              </form>
              <div className='center addMargin'>
                <p>Forgot your password?</p>
              </div>
            </div>
          </div>

          <div class="col">
            <div className='logInOutContainer'>
              <form method="post">
                <div className='center'>
                  <p className='headerFont'>Create Account</p>
                </div>
                <div className='mb-3'>
                  {/* <label className='labelForm' ><span className='star'>*</span>Username</label> */}
                  <input type='text' class="form-control" placeholder="Username" onChange={(event) => username = event.target.value}/>
                </div>
                <div className='mb-3'>
                  {/* <label className='labelForm'><span className='star'>*</span>Email Adress"</label> */}
                  <input type='password' class="form-control" placeholder="Email Adress" onChange={(event) => signupEmail = event.target.value}/>
                </div>
                <div className='mb-3'>
                  {/* <label className='labelForm'><span className='star'>*</span>Password</label> */}
                  <input type='password' class="form-control" placeholder="Password" onChange={(event) => signupPwd = event.target.value}/>
                </div>
                <div className='mb-3'>
                  {/* <label className='labelForm'><span className='star'>*</span>Confirm Password</label> */}
                  <input type='password' class="form-control" placeholder="Confirm Password" onChange={(event) => confirmPwd = event.target.value}/>
                </div>
                <div className='center'>
                  <button type="submit" class="btn loginAndRegisBut"onClick={register}>SIGN UP</button>
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