import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mission from './sites/Mission';
import Beyond from './sites/Beyond';
import Landing from './sites/Landing';
import Navbar from './components/Navbar'; // Import the new Navbar

function App() {
    return (
        <Router>
            <Navbar /> {/* Add the Navbar component */}
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/mission" element={<Mission />} />
                <Route path="/beyond" element={<Beyond />} />
            </Routes>
        </Router>
    );
}

export default App;