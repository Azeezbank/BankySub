import React from 'react'
import './App.css';
import '../src/Components/Transaction.css';
import '../src/Components/Authentication.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home'
import Airtime from './Components/Airtime';
import Data from './Components/Data';
import Register from './Components/auth/Register';
import Login from './Components/auth/Login';
import Electricity from './Components/Electricity';
import AdminDashBoard from './Components/AdminPage/AdminDashBoard';
import FundHist from './Components/AdminPage/FundHistory';
import Dashboard from './Components/AdminPage/Dashbord';
import Setting from './Components/AdminPage/Setting';
import Users from './Components/AdminPage/users/Users';
import DataGateway from './Components/AdminPage/DataGateway';
import HomeLayout from './Components/HomeLayout';
import LandinpPage from './Components/LandingPage/LandingPage';
import Verify from './Components/Verify';
import DataHistory from './Components/Histories/DataHistory';
import AirtimeHistory from './Components/Histories/AirtimeHistory';
import Verifymail from './Components/auth/Verifymail';
import UserInfo from './Components/AdminPage/users/UserInfo';
import ApiDocs from './Components/AdminPage/users/ApiDocs';
import Plans from './Components/plans';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandinpPage />} />
          <Route path='/user/*' element={<HomeLayout />} >
            <Route path='dashboard' element={<Home />} />
            <Route path='data' element={<Data />} />
            <Route path='airtime' element={<Airtime />} />
            <Route path='verify' element={<Verify />} />
            <Route path='data/history' element={<DataHistory />} />
            <Route path='airtime/history' element={<AirtimeHistory />} />
            <Route path='plans' element={<Plans />} />
          </Route>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/verify/mail' element={<Verifymail />} />
          <Route path='/vend/electicity/bill' element={<Electricity />} />

          <Route path='/admin/*' element={<AdminDashBoard />} >
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='found/hist' element={<FundHist />} />
            <Route path='users' element={<Users />} />
            <Route path='UserInfo/:id' element={<UserInfo />} />
            <Route path='setting' element={<Setting />} />
            <Route path='data/gateway' element={<DataGateway />} />
            <Route path='api/docs' element={<ApiDocs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
};

export default App;
