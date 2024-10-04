import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import PostDetails from './pages/PostDetails';

const RouteConfig = () => {
  return (
    <BrowserRouter basename='/'>
      <Navbar />
      <Routes>
        {/* Rotas abertas */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        
        {/* Rotas protegidas */}
        <Route 
          path='/about' 
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          } 
        />
        <Route 
          path='/post/:id' 
          element={
            <PrivateRoute>
              <PostDetails />
            </PrivateRoute>
          } 
        />
        <Route 
          path='/dashboard' 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteConfig;
