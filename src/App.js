import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SignIn from './SignIn';
import CreateAccount from "./CreateAccount";
import BabyProfile from './BabyProfile';
import Immunisations from './Immunisations';
import ToDo from './ToDo';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/baby-profile" element={<BabyProfile />} />
          <Route path="/immunisations" element={<Immunisations />} />
          <Route path="/to-do" element={<ToDo />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
