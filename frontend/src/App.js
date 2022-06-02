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
import History from './pages/history/History'

function App() {
  return (
    <Router>
      <div class="h-100">
        <Header />
        <div className="content-container">
          <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route exact path="/login" element={<SignInSignUp />} />
            <Route exact path="/signup" element={<SignInSignUp />} />
            <Route exact path="/history" element={<History />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>

  );
}

export default App;
