import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './sites/Landing';
import Mission from './sites/Mission';
import Beyond from './sites/Beyond';
import './App.css';

const App = () => {
  return (
    <BrowserRouter basename="/noctis">
      <Navbar />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/beyond" element={<Beyond />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

