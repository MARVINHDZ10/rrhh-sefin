import React from 'react'
import './App.css';
import Secured from './components/Secured.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import "typeface-poppins";

function App() {
  return (
    <Router>
      <Secured />
    </Router>
  );
}

export default App;
