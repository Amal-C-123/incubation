import { Routes, Route } from "react-router-dom";
import AdminRoutes from "./Components/AdminRoutes";
import UserRoutes from "./Components/UserRoutes";
import AdminHome from "./Pages/Admin/AdminHome";
import AdminLogin from "./Pages/Admin/AdminLogin";
import ApprovedList from "./Pages/Admin/ApprovedList";
import BookSlots from "./Pages/Admin/BookSlots";
import FormPage from "./Pages/User/FormPage";
import Login from "./Pages/User/Login";
import Signup from "./Pages/User/Signup";
import UserHome from "./Pages/User/UserHome";

function App() {
  return (
    <>
      <Routes>
        <Route element={<UserHome />} path="/" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<Login />} path="/login" />
        <Route element={<UserRoutes />}>
          <Route element={<FormPage />} path="/application" />
        </Route>

        <Route element={<AdminLogin />} path="/admin/login" />
        <Route element={<AdminRoutes />}>
          <Route element={<AdminHome />} path="/admin" />
          <Route element={<ApprovedList />} path="/admin/approved" />
          <Route element={<BookSlots/>} path="/admin/slot-book" />
        </Route>
      </Routes>
    </>
  );
}

export default App;
