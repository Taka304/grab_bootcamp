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
import Ent from './pages/ent/Ent'

function App() {
  return (
    <Router>
      <div class="h-100">
      <Header />
        <Routes>
              <Route exact path="/" element={<MainPage />} />
              <Route exact path="/login" element={<SignInSignUp/>} />
              <Route exact path="/signup" element={<SignInSignUp/>} />
              <Route exact path="/test" element={<Ent/>} />
            </Routes>
            <Footer />
      </div>
    </Router>

  );
}

export default App;
