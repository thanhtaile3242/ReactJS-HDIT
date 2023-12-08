import "./ManageQuiz.scss";
import Accordion from "react-bootstrap/Accordion";
import Select from "react-select";
import { useState } from "react";
import TableQuiz from "./TableQuiz.js";
const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
];

const ManageQuiz = (props) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("EASY");
    const [image, setImage] = useState(null);
    const handleChangeFile = (event) => {};
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
                                            placeholder={"Quiz type..."}
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
                                        <button className="my-3 btn btn-warning">
                                            Save
                                        </button>
                                    </div>
                                </fieldset>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <div className="list-detail">
                    <TableQuiz />
                </div>
            </div>
        </>
    );
};

export default ManageQuiz;
