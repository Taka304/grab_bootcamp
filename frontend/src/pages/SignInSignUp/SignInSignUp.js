import React from 'react'
import './SignInSignUp.css';

function SignInSignUp() {
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
                  <input type='text' class="form-control" placeholder="Email Adress" />
                </div>
                <div className='mb-3'>
                  {/* <label className='labelForm'><span className='star'>*</span>Password</label> */}
                  <input type='password' class="form-control" placeholder="Password" />
                </div>
                <div className='center addMargin'>
                  <button type="submit" class="btn loginAndRegisBut">SIGN IN</button>
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
                  <input type='text' class="form-control" placeholder="Username" />
                </div>
                <div className='mb-3'>
                  {/* <label className='labelForm'><span className='star'>*</span>Email Adress"</label> */}
                  <input type='password' class="form-control" placeholder="Email Adress" />
                </div>
                <div className='mb-3'>
                  {/* <label className='labelForm'><span className='star'>*</span>Password</label> */}
                  <input type='password' class="form-control" placeholder="Password" />
                </div>
                <div className='mb-3'>
                  {/* <label className='labelForm'><span className='star'>*</span>Confirm Password</label> */}
                  <input type='password' class="form-control" placeholder="Confirm Password" />
                </div>
                <div className='center addMargin'>
                  <button type="submit" class="btn loginAndRegisBut">SIGN UP</button>
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