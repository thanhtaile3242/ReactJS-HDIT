import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getDataQuiz } from "../../services/apiService.js";
import _ from "lodash";
import "./DetailQuiz.scss";
const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();

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
                        <div className="question">
                            Question 1: How are you today
                        </div>
                        <div className="answer">
                            <div className="a-child">A</div>
                            <div className="b-child">B</div>
                            <div className="c-child">C</div>
                            <div className="d-child">D</div>
                        </div>
                    </div>
                    <div className="footer">
                        <button className="btn btn-primary">Previous</button>
                        <button className="btn btn-secondary">Next</button>
                    </div>
                </div>
                <div className="right-content">count down</div>
            </div>
        </>
    );
};

export default DetailQuiz;
