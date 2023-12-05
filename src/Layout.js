import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import User from "./components/User/User.js";
import Admin from "./components/Admin/Admin.js";
import HomePage from "./components/Home/HomePage.js";
import ManageUser from "./components/Admin/Content/ManageUser.js";
import DashBoard from "./components/Admin/Content/DashBoard.js";
import Login from "./components/Auth/Login.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Layout = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="users" element={<User />} />
                </Route>
                <Route path="admin" element={<Admin />}>
                    <Route index element={<DashBoard />} />
                    <Route path="manage-users" element={<ManageUser />} />
                </Route>
                <Route path="login" element={<Login />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};
export default Layout;
