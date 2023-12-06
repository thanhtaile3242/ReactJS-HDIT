import videoHomePage from "../../assets/video-homepage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const HomePage = (props) => {
    const account = useSelector((state) => state.user.account);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const navigate = useNavigate();
    return (
        <>
            <div className="homepage-container">
                <video autoPlay muted loop>
                    <source src={videoHomePage} type="" />
                </video>
                <div className="homepage-content">
                    <div className="title-1">There's a better way to ask</div>
                    <div className="title-2">
                        You do not want to make a boring form. And your audience
                        won't answer one. Create a typeform instead and make
                        everyone happy
                    </div>
                    <div>
                        {isAuthenticated === false ? (
                            <button
                                className="title-3"
                                onClick={() => {
                                    navigate("/login");
                                }}
                            >
                                Get started. It is free
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    navigate("/users");
                                }}
                            >
                                Do Quiz Now
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
export default HomePage;
