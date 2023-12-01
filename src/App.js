import "./App.scss";
import Header from "./components/Header/Header.js";
import { Link } from "react-router-dom";
const App = () => {
    return (
        <div className="app-container">
            <Header />
            <div>
                <div>Test link </div>
                <div>
                    <button>
                        <Link to="/users">Test user</Link>
                    </button>
                    <button>
                        <Link to="/admin">Test Admin</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default App;
