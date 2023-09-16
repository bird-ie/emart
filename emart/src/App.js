import React, { createContext, useContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/Auth";
import Dashboard from "./components/Dashboard";
import Store from "./components/Store";
import Company from "./components/Company";
import Capacity from "./components/Capacity";
import Type from "./components/Type";
import Category from "./components/Category";
import EmployeeList from "./components/EmployeeList";
import Item from "./components/Item";
import UserList from "./components/UserList";
import Login from "./components/Login";
import Menu from "./components/General/Menu";
import "bootstrap/dist/css/bootstrap.min.css";
import ConditionalComponents from "./components/ConditionalComponents";
import DailySale from "./components/DailySale";
import DailySaleDetail from "./components/DailySaleDetail";
import TotalSale from "./components/dashboard components/TotalSale";
import MonthlyTotalSale from "./components/dashboard components/MonthlyTotalSale";
import MonthlyCashSale from "./components/dashboard components/MonthlyCashSale";
import MonthlyCreditSale from "./components/dashboard components/MonthlyCreditSale";
import DynamicBreadcrumbs from "./components/General/DynamicBreadcrumbs";


function App() {

  return (
    <AuthProvider>
      <BrowserRouter basename="/emart">
        <ConditionalComponents />
          <Routes>
            <Route path="/emart" element={<Login />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/store/*" element={<Store />} />
            <Route path="/company/*" element={<Company />} />
            <Route path="/capacity/*" element={<Capacity />} />
            <Route path="/type/*" element={<Type />} />
            <Route path="/category/*" element={<Category />} />
            <Route path="/employee-list/*" element={<EmployeeList />} />
            <Route path="/item/*" element={<Item />} />
            <Route path="/user-list/*" element={<UserList />} />
            <Route path="/menu/*" element={<Menu />} />
            <Route path="/daily-sale/*" element={<DailySale />} />
            <Route path="/daily-sale-detail/*" element={<DailySaleDetail />} />
            <Route path="/total-sale/*" element={<TotalSale />} />
            <Route
              path="/monthly-total-sale/*"
              element={<MonthlyTotalSale />}
            />
            <Route path="/monthly-cash-sale/*" element={<MonthlyCashSale />} />
            <Route
              path="/monthly-credit-sale/*"
              element={<MonthlyCreditSale />}
            />
          
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
