import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './sites/Landing';
import Mission from './sites/Mission';
import Beyond from './sites/Beyond';
import './App.css';

const App = () => (
  <BrowserRouter basename="/noctis">
    <Navbar />
    <main className="page-content">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/beyond" element={<Beyond />} />
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
);

export default App;
