import Select from "react-select";
import { useState } from "react";
import "./Question.scss";
import { BsFillPatchPlusFill, BsFillPatchMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
const options = [
    { value: "1", label: "1111" },
    { value: "2", label: "222" },
    { value: "3", label: "3" },
];
const Questions = (props) => {
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [dataImagePreview, setDataImagePreview] = useState({
        title: "",
        url: "",
    });
    const [questions, setQuestions] = useState([
        {
            id: uuidv4(),
            description: "",
            imageFile: "",
            imageName: "",
            answers: [{ id: uuidv4(), description: "", isCorrect: false }],
        },
    ]);

    const [isPreviewImage, setIsPreviewImage] = useState(false);

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

    const handleSubmitQuestionForQuiz = () => {
        console.log(questions);
    };
    return (
        <>
            <div className="questions-container">
                <div className="title">Manage Questions</div>
                <hr />
                <div className="add-new-question">
                    <div className="col-6 form-group">
                        <label className="mb-2">Select Quiz</label>
                        <Select
                            options={options}
                            defaultValue={selectedQuiz}
                            onChange={() => {
                                setSelectedQuiz();
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

export default Questions;
