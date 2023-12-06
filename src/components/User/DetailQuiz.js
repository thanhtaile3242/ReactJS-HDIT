import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getDataQuiz } from "../../services/apiService.js";
const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id;
    useEffect(() => {
        fetchQuestions();
    }, [quizId]);

    const fetchQuestions = async () => {
        const res = await getDataQuiz(quizId);
        console.log(res);
    };
    return (
        <>
            <div className="detail-quiz-container">detail quiz</div>
        </>
    );
};

export default DetailQuiz;
