import CountDown from "./CountDown.js";
const RightContent = (props) => {
    const { dataQuiz } = props;
    const onTimeUp = () => {
        props.handleFinishQuiz();
    };
    return (
        <>
            <div className="main-timer">
                <CountDown onTimeUp={onTimeUp} />
            </div>
            <div className="main-question">
                {dataQuiz &&
                    dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                            <div key={`q-${index + 1}`} className="question">
                                {index + 1}
                            </div>
                        );
                    })}
            </div>
        </>
    );
};
export default RightContent;
