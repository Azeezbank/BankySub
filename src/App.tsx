import React from 'react'
import './App.css';
import '../src/Components/Transaction.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Airtime from './Components/Airtime';
import Data from './Components/Data';

const App:React.FC = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/vend=airtime' element={<Airtime />} />
      <Route path='/vend=data' element={<Data />} />
    </Routes>
    </BrowserRouter>
    </>
  )
};

export default App;
