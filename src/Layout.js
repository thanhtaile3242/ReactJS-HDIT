import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import User from "./components/User/User.js";
import DetailQuiz from "./components/User/DetailQuiz.js";
import ListQuiz from "./components/User/ListQuiz.js";
import Admin from "./components/Admin/Admin.js";
import HomePage from "./components/Home/HomePage.js";
import ManageUser from "./components/Admin/Content/ManageUser.js";
import DashBoard from "./components/Admin/Content/DashBoard.js";
import Login from "./components/Auth/Login.js";
import Register from "./components/Auth/Register.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotFound = () => {
    return (
        <>
            <div className="alert alert-danger container mt-3">
                Not Found Data
            </div>
        </>
    );
};

const Layout = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="users" element={<ListQuiz />} />
                </Route>

                <Route path="quiz/:id" element={<DetailQuiz />} />

                <Route path="admin" element={<Admin />}>
                    <Route index element={<DashBoard />} />
                    <Route path="manage-users" element={<ManageUser />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
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
