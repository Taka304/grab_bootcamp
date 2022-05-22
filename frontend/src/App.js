import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";

import Header from './components/header';
import Footer from './components/footer';
import SignInSignUp from './pages/SignInSignUp/SignInSignUp';
import MainPage from './pages/MainPage/MainPage';

function App() {
  return (
    // <div className='pageContainer'>
    //   <Header />
    //   <div className='contentWrap'>
    //     <SignInSignUp />
    //     {/* <MainPage /> */}
    //   </div>
    //   <Footer />
    // </div>

    <Router>
      <div class="h-100">
        <div class="row px-2 fixed-top">
          <Header />
        </div>
        <div class="pt-2">
          <div class="row h-100 pt-5">
            <Routes>
              <Route exact path="/" element={<MainPage />} />
              <Route exact path="/login" element={<SignInSignUp/>} />
              <Route exact path="/signup" element={<SignInSignUp/>} />
              {/* <Redirect to="/"/> */}
            </Routes>
            <div class="row px-2 fixed-top">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </Router>

  );
}

export default App;
