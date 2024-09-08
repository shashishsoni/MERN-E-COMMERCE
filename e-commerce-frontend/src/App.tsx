import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn/SignIn';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';
import { useAppContext } from './context/AppContext';
import Wishlist from './pages/Wishlist/Wishlist';

function App() {
  const { isloggedin, accessToken, userData } = useAppContext();

  const IsLoggedin: boolean | null =
    isloggedin && !!accessToken && !!userData?.username;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={IsLoggedin ? <Navigate to="/home" /> : <SignIn />}
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
          path="/wishlist"
          element={
            <ProtectedRoute isLoggedin={isloggedin}>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route
        path="/SignUp"
        element={<SignUp />}
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