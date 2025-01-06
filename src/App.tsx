import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './routes/Login/Login';
import AllBrothers from './routes/AllBrothers/AllBrothers';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Brother from './routes/Brother/Brother';
import { useState } from 'react';
function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/all" element={<ProtectedRoute><AllBrothers/></ProtectedRoute>}></Route>
        <Route path="/brother/:id" element={<ProtectedRoute><Brother/></ProtectedRoute>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
