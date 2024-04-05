import { createRoot } from "react-dom/client";

import "./index.css";
import theme from "./flowbite-theme";
import { Flowbite } from "flowbite-react";
import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter } from "react-router-dom";
import DashboardPage from "./pages";
import SignInPage from "./pages/authentication/sign-in";
import EcommerceProductsPage from "./pages/e-commerce/products";
import UserListPage from "./pages/users/list";
import TransactionsPage from "./pages/transactions/list"
import PredictionsPage from "./pages/predictions/ai-analysis";

const container = document.getElementById("root");

if (!container) {
  throw new Error("React root element doesn't exist!");
}

const isAuthenticated = localStorage.getItem('token');

const root = createRoot(container);

root.render(
    <Flowbite theme={{ theme }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/sign-in" />} index />
          <Route path="/sign-in" element={<SignInPage />} />
          {/*<Route path="/authentication/sign-up" element={<SignUpPage />} />*/}
          <Route path="/products" element={isAuthenticated ? <EcommerceProductsPage /> : <Navigate to="/sign-in" />} />
          <Route path="/users" element={isAuthenticated ? <UserListPage /> : <Navigate to="/sign-in" />} />
          <Route path="/transactions" element={isAuthenticated ? <TransactionsPage /> : <Navigate to="/sign-in" />} />
          <Route path="/ai-analysis" element={isAuthenticated ? <PredictionsPage /> : <Navigate to="/sign-in" />} />
        </Routes>
      </BrowserRouter>
    </Flowbite>
);
