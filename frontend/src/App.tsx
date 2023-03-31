import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Login from './features/user/Login';
import Register from './features/user/Registr';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<h2>Not Found !</h2>} />
      </Routes>
    </div>
  );
}

export default App;
