import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/header';
import Footer from './components/footer';
import SignInSignUp from './pages/SignInSignUp/SignInSignUp';
// import MainPage from './pages/MainPage/MainPage';

function App() {
  return (
    <div className='pageContainer'>
      <Header />
      <div className='contentWrap'>
        <SignInSignUp />
        {/* <MainPage /> */}
      </div>
      <Footer />
    </div>

    
  );
}

export default App;
