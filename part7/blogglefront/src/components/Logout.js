import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { manageUserLogout } from "../reducers/authSlice";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(manageUserLogout());
  }, [dispatch]);

  return <Navigate replace to="/Login" />;
};

export default Logout