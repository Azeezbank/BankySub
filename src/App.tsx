import React from 'react'
import './App.css';
import '../src/Components/Transaction.css';
import '../src/Components/Authentication.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Airtime from './Components/Airtime';
import Data from './Components/Data';
import Register from './Components/Register';
import Login from './Components/Login';
import Electricity from './Components/Electricity';
import AdminDashBoard from './Components/AdminDashBoard';

const App:React.FC = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/vend=airtime' element={<Airtime />} />
      <Route path='/vend=data' element={<Data />} />
      <Route path='/register?' element={<Register />} />
      <Route path='/login?' element={<Login />} />
      <Route path='/vent=electicity-bill' element={<Electricity />} />
      <Route path='/*' element={<AdminDashBoard />} />
    </Routes>
    </BrowserRouter>
    </>
  )
};

export default App;
