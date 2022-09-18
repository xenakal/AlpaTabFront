import React from 'react'
import SharedLayout from './components/layout/SharedLayout';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Users from './pages/users/Users';
import Transactions from './pages/transactions/Transactions';
import Balance from './pages/mybalance/Balance';
import {
  BrowserRouter, 
  Routes, 
  Route,
} from "react-router-dom";

import './App.css';

function App() {
  return (
    <div className="App">
      <SharedLayout>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home/>} />
              <Route path="login" element={<Login/>}/>
              <Route path="users" element={<Users/>}/> 
              <Route path="transactions" element={<Transactions/>}/>
              <Route path="mybalance" element={<Balance/>}/>
              <Route path="myprofile" element={<Home/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </SharedLayout>
    </div>
  );
}

export default App;
