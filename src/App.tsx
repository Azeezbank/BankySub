import React from 'react'
import './App.css';
import '../src/Components/Transaction.css';
import '../src/Components/Authentication.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home'
import Airtime from './Components/Airtime';
import Data from './Components/Data';
import Register from './Components/Register';
import Login from './Components/Login';
import Electricity from './Components/Electricity';
import AdminDashBoard from './Components/AdminPage/AdminDashBoard';
import FundHist from './Components/AdminPage/FundHistory';
import Dashboard from './Components/AdminPage/Dashboed';
import Setting from './Components/AdminPage/Setting';
import User from './Components/AdminPage/User';
import DataGateway from './Components/AdminPage/DataGateway';
import HomeLayout from './Components/HomeLayout';
import LandinpPage from './Components/LandingPage/LandingPage';
import Verify from './Components/Verify';
import DataHistory from './Components/Histories/DataHistory';
import AirtimeHistory from './Components/Histories/AirtimeHistory';

const App:React.FC = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandinpPage />} />
      <Route path='/user/*' element={<HomeLayout /> } >
      <Route path='dashboard' element={<Home />} />
      <Route path='data' element={<Data />} />
      <Route path='airtime' element={<Airtime />} />
      <Route path='verify' element={<Verify />} />
      <Route path='data/history' element={<DataHistory />} />
      <Route path='airtime/history' element={<AirtimeHistory />} />
      </Route>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/vent=electicity-bill' element={<Electricity />} />
      <Route path='/admin/*' element={<AdminDashBoard />} >
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='found/hist' element={ <FundHist />} />
      <Route path='user' element={<User />} />
      <Route path='setting' element={<Setting />} />
      <Route path='data/gateway' element={<DataGateway />} />
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
};

export default App;
