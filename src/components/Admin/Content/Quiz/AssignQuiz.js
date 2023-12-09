import Select from "react-select";
import { useState, useEffect } from "react";
import {
    getAllQuizForAdmin,
    getAllUsers,
} from "../../../../services/apiService.js";
const AssignQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({});

    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});

    useEffect(() => {
        fetchQuiz();
        fetchUser();
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

    const fetchUser = async () => {
        let res = await getAllUsers();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`,
                };
            });
            setListUser(newQuiz);
        }
    };

    return (
        <div className="assign-quiz-container row">
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
            <div className="col-6 form-group">
                <label className="mb-2">Select User</label>
                <Select
                    options={listUser}
                    defaultValue={selectedUser}
                    onChange={(event) => {
                        setSelectedUser(event);
                    }}
                />
            </div>
            <div>
                <button className="btn btn-warning mt-3">Assign</button>
            </div>
        </div>
    );
};
export default AssignQuiz;
