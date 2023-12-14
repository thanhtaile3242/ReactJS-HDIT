import CountDown from "./CountDown.js";
import { useRef } from "react";
const RightContent = (props) => {
    const { dataQuiz } = props;
    const refDiv = useRef([]);
    const onTimeUp = () => {
        props.handleFinishQuiz();
    };
    const getClassQuestion = (question) => {
        if (question && question.answers.length > 0) {
            let isUnAnswered = question.answers.find(
                (a) => a.isSelected === true
            );
            if (isUnAnswered) {
                return "question selected";
            }
        }
        return "question";
    };

    const handleClickQuestion = (index, question) => {
        props.setIndex(index);
        if (refDiv.current) {
            refDiv.current.forEach((item) => {
                if (item && item.className === "question clicked") {
                    item.className = "question";
                }
            });
        }

        if (question && question.answers.length > 0) {
            let isUnAnswered = question.answers.find(
                (a) => a.isSelected === true
            );
            if (isUnAnswered) {
                return;
            }
        }
        refDiv.current[index].className = "question clicked";
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
                            <div
                                key={`q-${index + 1}`}
                                className={getClassQuestion(item)}
                                onClick={() => {
                                    handleClickQuestion(index, item);
                                }}
                                ref={(element) =>
                                    (refDiv.current[index] = element)
                                }
                            >
                                {index + 1}
                            </div>
                        );
                    })}
            </div>
        </>
    );
};
export default RightContent;
