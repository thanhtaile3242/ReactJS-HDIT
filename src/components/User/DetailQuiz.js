import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService.js";
import Question from "./Question.js";
import ModalResult from "./ModalResult.js";
import _ from "lodash";
import "./DetailQuiz.scss";
const DetailQuiz = (props) => {
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({});

    useEffect(() => {
        fetchQuestions();
    }, [quizId]);

    const fetchQuestions = async () => {
        const res = await getDataQuiz(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                .groupBy("id")
                .map((value, key) => {
                    let answers = [];
                    let questionDescription = "";
                    let questionImage = "";
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            questionImage = item.image;
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                    });

                    return {
                        questionId: key,
                        questionDescription: questionDescription,
                        questionImage: questionImage,
                        answers: answers,
                    };
                })
                .value();

            setDataQuiz(data);
        }
    };

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1) {
            setIndex(index + 1);
        } else {
            return;
        }
    };

    const handlePrevious = () => {
        if (dataQuiz && index - 1 < 0) {
            return;
        } else {
            setIndex(index - 1);
        }
    };

    const handleCheckBox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(
            (item) => +item.questionId === +questionId
        );

        if (question && question.answers) {
            let b = question.answers.map((item) => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            });
            question.answers = b;
        }

        let index = dataQuizClone.findIndex(
            (item) => +item.questionId === +questionId
        );

        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    };

    const handleFinishQuiz = async () => {
        let payload = {
            quizId: +quizId,
            answers: [],
        };
        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach((question) => {
                let questionId = +question.questionId;
                let userAnswerId = [];

                question.answers.forEach((answer) => {
                    if (answer.isSelected === true) {
                        userAnswerId.push(answer.id);
                    }
                });

                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId,
                });
            });
            payload.answers = answers;
            //
            let res = await postSubmitQuiz(payload);

            if (res && res.EC === 0) {
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData,
                });
                setIsShowModalResult(true);
            } else {
                alert("wrong");
            }
        }
    };

    return (
        <>
            <div className="detail-quiz-container">
                <div className="left-content">
                    <div className="title">
                        {" "}
                        Quiz {quizId}: {location?.state?.quizTitle}
                    </div>
                    <hr />
                    <div className="q-body">
                        <img src="" alt="" />
                    </div>

                    <div className="q-content">
                        <Question
                            data={
                                dataQuiz && dataQuiz.length > 0
                                    ? dataQuiz[index]
                                    : []
                            }
                            index={index}
                            handleCheckBox={handleCheckBox}
                        />
                    </div>
                    <div className="footer">
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                handlePrevious();
                            }}
                        >
                            Previous
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                handleNext();
                            }}
                        >
                            Next
                        </button>
                        <button
                            className="btn btn-warning"
                            onClick={() => {
                                handleFinishQuiz();
                            }}
                        >
                            Finish
                        </button>
                    </div>
                </div>
                <div className="right-content">count down</div>
                <ModalResult
                    show={isShowModalResult}
                    setShow={setIsShowModalResult}
                    dataModalResult={dataModalResult}
                />
            </div>
        </>
    );
};

export default DetailQuiz;
