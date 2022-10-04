import React from 'react'
import SharedLayout from './components/layout/SharedLayout';
import Home from './pages/home/Home';
import Users from './pages/users/Users';
import NewUserForm from './pages/newentryform/NewUserForm';
import Transactions from './pages/transactions/Transactions';
import NewTransactionForm from './pages/newentryform/NewTransactionForm';
import Balance from './pages/mybalance/Balance';
import ModifTransactionForm from './pages/modifyentryform/ModifTransactionForm';
import ModifUserForm from './pages/modifyentryform/ModifUserForm';

import { ProtectedRoute } from './components/protected-route';
import {
  BrowserRouter, 
  Routes, 
  Route,
} from "react-router-dom";

import './App.css';
import './variables.scss'

function App() {
  return (
    <div className="App">
      <SharedLayout>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home/>} />
              <Route 
                path="users/" 
                element={<ProtectedRoute component={Users} />}
              />
              <Route 
                path="users/new/"
                element={<ProtectedRoute component={NewUserForm} />}
              />
              <Route 
                path="users/:id" 
                element={<ProtectedRoute component={ModifUserForm} />}
              />
              <Route 
                path="transactions/" 
                element={<ProtectedRoute component={Transactions} />}
              />
              <Route 
                path="transaction/:id" 
                element={<ProtectedRoute component={ModifTransactionForm} />}
              />
              <Route 
                path="transactions/new/"
                element={<ProtectedRoute component={NewTransactionForm} />}
              />
              <Route 
                path="mybalance/" 
                element={<ProtectedRoute component={Balance} />}
              />
              {/* <Route 
                path="myprofile/" 
                element={<ProtectedRoute component={UserProfile} />}
              /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </SharedLayout>
    </div>
  );
}

export default App;
