import axios from "../utils/axiosCustomize";

const postCreateNewUser = async (email, password, username, role, image) => {
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("username", username);
    data.append("role", role);
    data.append("userImage", image);
    return await axios.post("api/v1/participant", data);
};

const getAllUsers = async () => {
    return await axios.get("api/v1/participant/all");
};

const putUpdateUser = async (id, username, role, image) => {
    const data = new FormData();
    data.append("id", id);
    data.append("username", username);
    data.append("role", role);
    data.append("userImage", image);
    return await axios.put("api/v1/participant", data);
};

const deleteUser = async (userId) => {
    return await axios.delete("api/v1/participant", { data: { id: userId } });
};

const getUserPaginate = async (page, limit) => {
    return await axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const postLogin = async (userEmail, userPassword) => {
    return await axios.post("api/v1/login", {
        email: userEmail,
        password: userPassword,
        deday: 5000,
    });
};

const getQuizByUser = () => {
    return axios.get("api/v1/quiz-by-participant");
};

const getDataQuiz = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
};

const postSubmitQuiz = (data) => {
    return axios.post(`api/v1/quiz-submit`, { ...data });
};

const getAllQuizForAdmin = () => {
    return axios.get(`api/v1/quiz/all`);
};

const postCreateNewQuestionForQuiz = async (quiz_Id, description, image) => {
    const data = new FormData();
    data.append(`quiz_id`, quiz_Id);
    data.append(`description`, description);
    data.append(`questionImage`, image);
    return axios.post(`api/v1/question`, data);
};

const postCreateNewAnswerForQuestion = async (
    description,
    correct_answer,
    question_id
) => {
    return await axios.post("api/v1/answer", {
        description: description,
        correct_answer: correct_answer,
        question_id: question_id,
    });
};

const postAssignQuiz = (quizId, userId) => {
    return axios.post(`api/v1/quiz-assign-to-user`, { quizId, userId });
};

const postCreateNewQuiz = async (description, name, difficulty, image) => {
    const data = new FormData();
    data.append("description", description);
    data.append("name", name);
    data.append("difficulty", difficulty);
    data.append("quizImage", image);
    return await axios.post("api/v1/quiz", data);
};

const getQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`);
};

const postUpsertQA = (data) => {
    return axios.post(`api/v1/quiz-upsert-qa`, { ...data });
};

export {
    postCreateNewUser,
    getAllUsers,
    putUpdateUser,
    deleteUser,
    getUserPaginate,
    postLogin,
    getQuizByUser,
    getDataQuiz,
    postSubmitQuiz,
    getAllQuizForAdmin,
    postCreateNewQuestionForQuiz,
    postCreateNewAnswerForQuestion,
    postAssignQuiz,
    postCreateNewQuiz,
    getQuizWithQA,
    postUpsertQA,
};
