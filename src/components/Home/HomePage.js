import videoHomePage from "../../assets/video-homepage.mp4";
const HomePage = (props) => {
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
                        <button className="title-3">
                            Get started. It is free
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default HomePage;
