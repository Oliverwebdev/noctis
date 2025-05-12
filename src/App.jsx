import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Mission from './sites/Mission';
import Beyond from './sites/Beyond';
import Landing from './sites/Landing';

function App() {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/mission">Mission</Link></li>
                    <li><Link to="/beyond">Beyon</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/mission" element={<Mission />} />
                <Route path="/beyond" element={<Beyond />} />
            </Routes>
        </Router>
    );
}
// wir brauchen eine navbar die full responsive ist und zu dem thema der seite passt
// ebenso soll es flexibel sein dass man bei bedarf noch mehr seiten ergänzen könnte später

export default App;
