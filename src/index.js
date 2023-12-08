import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout.js";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";

import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import "nprogress/nprogress.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-perfect-scrollbar/dist/css/styles.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        {/* <React.StrictMode> */}
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        </PersistGate>
        {/* </React.StrictMode> */}
    </Provider>
);

reportWebVitals();
