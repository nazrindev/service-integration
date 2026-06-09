import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/layout";
import Login from "../pages/Login/Login";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}></Route>
    </Routes>
  );
}
