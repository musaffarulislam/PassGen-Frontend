import { useState } from 'react' 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.scss'
import { Routers } from './routes/Routers';
import { Theme } from './components/Theme/Theme';

function App() { 
  return (
    <div>
      <Theme />
      <Router>
        <Routes>
          <Route path="/*" element={<Routers />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
