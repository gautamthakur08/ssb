import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PPDTTest from './components/tests/PPDT/PPDTTest.jsx';
import WATTest from './components/tests/WAT/WATTest.jsx';
import Home from './pages/Home';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/ssb" element={<Home />} />
        <Route path="/ppdt" element={<PPDTTest />} />
        <Route path="/wat" element={<WATTest />} />
      </Routes>
    </Router>
  );
}

export default App;
