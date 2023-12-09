import Select from "react-select";
import { useState, useEffect } from "react";
import "./QuizQA.scss";
import { BsFillPatchPlusFill, BsFillPatchMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import {
    getAllQuizForAdmin,
    postCreateNewQuestionForQuiz,
    postCreateNewAnswerForQuestion,
} from "../../../../services/apiService.js";
import { toast } from "react-toastify";
const QuizQA = (props) => {
    const initQuestion = [
        {
            id: uuidv4(),
            description: "",
            imageFile: "",
            imageName: "",
            answers: [{ id: uuidv4(), description: "", isCorrect: false }],
        },
    ];
    const [dataImagePreview, setDataImagePreview] = useState({
        title: "",
        url: "",
    });
    const [questions, setQuestions] = useState(initQuestion);
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({});
    useEffect(() => {
        fetchQuiz();
    }, []);
    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`,
                };
            });
            setListQuiz(newQuiz);
        }
    };

    const handleAddRemoveQuestion = (type, id) => {
        if (type === "ADD") {
            const newQuestion = {
                id: uuidv4(),
                description: "question !!!",
                imageFile: "",
                imageName: "0 file is uploaded",
                answers: [
                    { id: uuidv4(), description: "answer 1", isCorrect: false },
                ],
            };
            setQuestions([...questions, newQuestion]);
        }
        if (type === "REMOVE") {
            let questionsClone = _.cloneDeep(questions);
            questionsClone = questionsClone.filter((item) => item.id !== id);
            setQuestions(questionsClone);
        }
    };

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions);
        if (type === "ADD") {
            const newAnswer = {
                id: uuidv4(),
                description: "answer 1",
                iscorrect: false,
            };

            const index = questionsClone.findIndex(
                (item) => item.id === questionId
            );
            if (index > -1) {
                questionsClone[index].answers.push(newAnswer);
                setQuestions(questionsClone);
            }
        }
        if (type === "REMOVE") {
            const index = questionsClone.findIndex(
                (item) => item.id === questionId
            );
            if (index > -1) {
                questionsClone[index].answers = questionsClone[
                    index
                ].answers.filter((item) => item.id !== answerId);
                setQuestions(questionsClone);
            }
        }
    };

    const handleOnChange = (type, questionId, value) => {
        if (type === "QUESTION") {
            let questionsClone = _.cloneDeep(questions);
            const index = questionsClone.findIndex(
                (item) => item.id === questionId
            );
            if (index > -1) {
                questionsClone[index].description = value;
                setQuestions(questionsClone);
            }
        }
    };

    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions);
        const index = questionsClone.findIndex(
            (item) => item.id === questionId
        );
        if (
            index > -1 &&
            event.target &&
            event.target.files &&
            event.target.files[0]
        ) {
            questionsClone[index].imageFile = event.target.files[0];
            questionsClone[index].imageName = event.target.files[0].name;
            setQuestions(questionsClone);
        }
    };

    const handleAnswerQuestion = (type, questionId, answerId, value) => {
        let questionsClone = _.cloneDeep(questions);
        const index = questionsClone.findIndex(
            (item) => item.id === questionId
        );
        if (index > -1) {
            questionsClone[index].answers = questionsClone[index].answers.map(
                (answer) => {
                    if (answer.id === answerId) {
                        if (type === "CHECKBOX") {
                            answer.isCorrect = value;
                        }
                        if (type === "INPUT") {
                            answer.description = value;
                        }
                    }
                    return answer;
                }
            );
            setQuestions(questionsClone);
        }
    };

    const handlePreviewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions);
        const index = questionsClone.findIndex(
            (item) => item.id === questionId
        );
        if (index > -1) {
            setDataImagePreview({
                title: questionsClone[index].imageName,
                url: URL.createObjectURL(questionsClone[index].imageFile),
            });
            setIsPreviewImage(true);
        }
    };

    const handleSubmitQuestionForQuiz = async () => {
        // validate
        if (_.isEmpty(selectedQuiz)) {
            toast.error("Please choose a Quiz");
            return;
        }
        // validate answer
        let isValidAnswer = true;
        let indexQuestion = 0;
        let indexAnswer = 0;
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValidAnswer = false;
                    indexAnswer = j + 1;
                    break;
                }
            }
            indexQuestion = i + 1;
            if (isValidAnswer === false) {
                break;
            }
        }
        if (isValidAnswer === false) {
            toast.error(
                `Not Empty Answer ${indexAnswer} at Question ${indexQuestion}`
            );
        }

        // Validate question
        let isValidQuestion = true;
        let indexQuestion1 = 0;
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                isValidQuestion = false;
                indexQuestion1 = i + 1;
                break;
            }
        }
        if (isValidQuestion === false) {
            toast.error(`Not Empty Description at Question ${indexQuestion1}`);
            return;
        }

        for (const question of questions) {
            const q = await postCreateNewQuestionForQuiz(
                +selectedQuiz.value,
                question.description,
                question.imageFile
            );
            for (const answer of question.answers) {
                await postCreateNewAnswerForQuestion(
                    answer.description,
                    answer.isCorrect,
                    q.DT.id
                );
            }
        }
        toast.success("Create questions and answers succeed");
        setQuestions(initQuestion);
    };
    return (
        <>
            <div className="questions-container">
                <div className="add-new-question">
                    <div className="col-6 form-group">
                        <label className="mb-2">Select Quiz</label>
                        <Select
                            options={listQuiz}
                            defaultValue={selectedQuiz}
                            onChange={(event) => {
                                setSelectedQuiz(event);
                            }}
                        />
                    </div>
                    <div className="mt-3 mb-2">Add Questions</div>
                    {questions &&
                        questions.length > 0 &&
                        questions.map((question, index) => {
                            return (
                                <div key={question.id} className="q-main mb-4">
                                    <div className="questions-content">
                                        <div className="form-floating description">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={question.description}
                                                onChange={(event) => {
                                                    handleOnChange(
                                                        "QUESTION",
                                                        question.id,
                                                        event.target.value
                                                    );
                                                }}
                                            />
                                            <label>
                                                Question {index + 1}'s
                                                Description
                                            </label>
                                        </div>
                                        <div className="group-upload">
                                            <label
                                                className="label-up"
                                                htmlFor={`image${question.id}`}
                                            >
                                                <RiImageAddFill />
                                            </label>
                                            <input
                                                id={`image${question.id}`}
                                                type="file"
                                                hidden
                                                onChange={(event) => {
                                                    handleOnChangeFileQuestion(
                                                        question.id,
                                                        event
                                                    );
                                                }}
                                            />

                                            <span>
                                                {question.imageName ? (
                                                    <span
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => {
                                                            handlePreviewImage(
                                                                question.id
                                                            );
                                                        }}
                                                    >
                                                        {question.imageName}
                                                    </span>
                                                ) : (
                                                    "0 file"
                                                )}
                                            </span>
                                        </div>
                                        <div className="btn-add">
                                            <span
                                                onClick={() => {
                                                    handleAddRemoveQuestion(
                                                        "ADD",
                                                        ""
                                                    );
                                                }}
                                            >
                                                <BsFillPatchPlusFill className="icon-add" />
                                            </span>
                                            {questions.length > 1 && (
                                                <span
                                                    onClick={() => {
                                                        handleAddRemoveQuestion(
                                                            "REMOVE",
                                                            question.id
                                                        );
                                                    }}
                                                >
                                                    <BsFillPatchMinusFill className="icon-remove" />
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {question.answers &&
                                        question.answers.length > 0 &&
                                        question.answers.map(
                                            (answer, index) => {
                                                return (
                                                    <div
                                                        className="answers-content"
                                                        key={answer.id}
                                                    >
                                                        <input
                                                            className="form-check-input iscorrect"
                                                            type="checkbox"
                                                            checked={
                                                                answer.isCorrect
                                                            }
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                handleAnswerQuestion(
                                                                    "CHECKBOX",
                                                                    question.id,
                                                                    answer.id,
                                                                    event.target
                                                                        .checked
                                                                );
                                                            }}
                                                        />
                                                        <div className="form-floating answer-name">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={
                                                                    answer.description
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    handleAnswerQuestion(
                                                                        "INPUT",
                                                                        question.id,
                                                                        answer.id,
                                                                        event
                                                                            .target
                                                                            .value
                                                                    );
                                                                }}
                                                            />
                                                            <label>
                                                                Answer{" "}
                                                                {index + 1}
                                                            </label>
                                                        </div>
                                                        <div className="btn-group">
                                                            <span>
                                                                <AiOutlinePlusCircle
                                                                    className="icon-add"
                                                                    onClick={() => {
                                                                        handleAddRemoveAnswer(
                                                                            "ADD",
                                                                            question.id
                                                                        );
                                                                    }}
                                                                />
                                                            </span>
                                                            {question.answers
                                                                .length > 1 && (
                                                                <span>
                                                                    <AiOutlineMinusCircle
                                                                        className="icon-remove"
                                                                        onClick={() => {
                                                                            handleAddRemoveAnswer(
                                                                                "REMOVE",
                                                                                question.id,
                                                                                answer.id
                                                                            );
                                                                        }}
                                                                    />
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )}
                                </div>
                            );
                        })}

                    {questions && questions.length > 0 && (
                        <div>
                            <button
                                className="btn btn-warning"
                                onClick={() => {
                                    handleSubmitQuestionForQuiz();
                                }}
                            >
                                Save Question
                            </button>
                        </div>
                    )}
                    {isPreviewImage === true && (
                        <Lightbox
                            image={dataImagePreview.url}
                            onClose={() => {
                                setIsPreviewImage(false);
                            }}
                            title={`${
                                dataImagePreview.title
                                    ? dataImagePreview.title
                                    : "0 file"
                            }`}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default QuizQA;
