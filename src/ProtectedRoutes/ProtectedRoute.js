import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { myContext } from '../ContextProvider/AppContext'

const ProtectedRoute = () => {
  const { isAuth } = useContext(myContext);
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
