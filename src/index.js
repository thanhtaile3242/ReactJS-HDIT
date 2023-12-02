import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import User from "./components/User/User.js";
import Admin from "./components/Admin/Admin.js";
import HomePage from "./components/Home/HomePage.js";
import ManageUser from "./components/Admin/Content/ManageUser.js";
import DashBoard from "./components/Admin/Content/DashBoard.js";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        {/* <React.StrictMode> */}
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="users" element={<User />} />
                </Route>
                <Route path="admin" element={<Admin />}>
                    <Route index element={<DashBoard />} />
                    <Route path="manage-users" element={<ManageUser />} />
                </Route>
            </Routes>
        </BrowserRouter>
        {/* </React.StrictMode> */}
    </Provider>
);

reportWebVitals();
