import "./Login.scss";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiService.js";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async () => {
        //Validate
        // Call api
        let data = await postLogin(email, password);

        if (data && data?.EC === 0) {
            toast.success(data.EM);
            navigate("/");
        }
        if (data && +data?.EC !== 0) {
            toast.error(data.EM);
        }
    };

    return (
        <>
            <div className="login-container">
                <div className="header">
                    Don't have an account yet?
                    <button>Sign Up</button>
                </div>
                <div className="title col-4 mx-auto">HoiDanIT</div>
                <div className="welcome col-4 mx-auto">Hello, who is this?</div>
                <div className="content-form col-4 mx-auto">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />
                    </div>
                    <span className="forgot-password">Forgot password?</span>
                    <div>
                        <button
                            className="btn-submit"
                            onClick={() => {
                                handleLogin();
                            }}
                        >
                            Log in
                        </button>
                    </div>
                    <div className="text-center">
                        <span
                            className="back"
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            {" "}
                            &#60; &#60; Go to Home Page
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
