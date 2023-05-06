import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Login from "../pages/Login/Login";

export default function Loggedinuser() {
  const user = useSelector((users) => users.login.loggedIn);
  return user ? <Outlet /> : <Login />;
}
