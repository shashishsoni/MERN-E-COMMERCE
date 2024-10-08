import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn/SignIn';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';
import { useAppContext } from './context/AppContext';
import Wishlist from './pages/Wishlist/Wishlist';
import CartPage from './pages/cart/CartPage'

function App() {
  const { isloggedin, accessToken, userData } = useAppContext();

  const IsLoggedin: boolean | null =
    isloggedin && !!accessToken && !!userData?.username;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={IsLoggedin ? <Navigate to="/home" /> : <Home />}
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute isLoggedin={isloggedin}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Wishlist"
          element={
            <ProtectedRoute isLoggedin={isloggedin}>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route
        path = "/CartPage"
        element = {
          <ProtectedRoute isLoggedin={isloggedin}>
            <CartPage />
            </ProtectedRoute>
        }
        />

        <Route
        path="/SignUp"
        element={<SignUp />}
        />

        <Route
        path="/SignIn"
        element={<SignIn />}
        />

        <Route
            path="*"
            element = {<Navigate to= "/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

interface ProtectedRouteProps {
  isLoggedin: boolean | null;
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isLoggedin,
  children,
}) => {
  return isLoggedin ? children : <Navigate to="/" />;
};