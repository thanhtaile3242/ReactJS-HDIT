import "./ManageQuiz.scss";
import Accordion from "react-bootstrap/Accordion";
import Select from "react-select";
import { useState, useEffect } from "react";
import TableQuiz from "./TableQuiz.js";
import QuizQA from "./QuizQA.js";
import AssignQuiz from "./AssignQuiz.js";
import {
    postCreateNewQuiz,
    getAllQuizForAdmin,
} from "../../../../services/apiService.js";
import { toast } from "react-toastify";
const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
];

const ManageQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchQuiz();
    }, []);
    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        }
    };

    const handleChangeFile = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };

    const handleSubmitQuiz = async () => {
        // Validate
        if (!name || !description || !image) {
            toast.error("Name, Description and Image is required");
            return;
        }

        let res = await postCreateNewQuiz(
            description,
            name,
            type?.value,
            image
        );
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setName("");
            setDescription("");
            setImage(null);
            fetchQuiz();
        } else {
            toast.error(res.EM);
        }
    };

    return (
        <>
            <div className="quiz-container">
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <b>ManageQuiz</b>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className="add-new">
                                <fieldset className="border rounded-3 p-3">
                                    <legend className="float-none w-auto px-3">
                                        Add New Quiz
                                    </legend>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder=""
                                            value={name}
                                            onChange={(event) => {
                                                setName(event.target.value);
                                            }}
                                        />
                                        <label>Name</label>
                                    </div>
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder=""
                                            value={description}
                                            onChange={(event) => {
                                                setDescription(
                                                    event.target.value
                                                );
                                            }}
                                        />
                                        <label>Description</label>
                                    </div>
                                    <div className="my-3">
                                        <Select
                                            value={type}
                                            options={options}
                                            defaultValue={type}
                                            onChange={(event) => {
                                                setType(event);
                                            }}
                                        />
                                    </div>

                                    <div className="more-actions form-group">
                                        <label className="mb-2">
                                            Upload Image
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            onChange={(event) => {
                                                handleChangeFile(event);
                                            }}
                                        />
                                        <button
                                            onClick={() => {
                                                handleSubmitQuiz();
                                            }}
                                            className="my-3 btn btn-warning"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </fieldset>
                            </div>
                            <div className="list-detail">
                                <TableQuiz listQuiz={listQuiz} />
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>
                            <b>Update Q/A Quizzes</b>
                        </Accordion.Header>
                        <Accordion.Body>
                            <QuizQA />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>
                            <b>Assign to Users</b>
                        </Accordion.Header>
                        <Accordion.Body>
                            <AssignQuiz />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </>
    );
};

export default ManageQuiz;
