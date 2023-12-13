import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import { useState } from "react";
const Question = (props) => {
    const { data, index } = props;

    const [isPreviewImage, setIsPreviewImage] = useState(false);

    const handleCheckBox2 = (event, aId, qId) => {
        props.handleCheckBox(aId, qId);
    };
    if (_.isEmpty(data)) {
        return <></>;
    }
    return (
        <>
            {data.questionImage ? (
                <div className="q-image">
                    <img
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            setIsPreviewImage(true);
                        }}
                        src={`data:image/jpeg;base64,${data.questionImage}`}
                        alt=""
                    />
                    {isPreviewImage === true && (
                        <Lightbox
                            image={`data:image/jpeg;base64,${data.questionImage}`}
                            onClose={() => {
                                setIsPreviewImage(false);
                            }}
                            title={`Question image`}
                        />
                    )}
                </div>
            ) : (
                <div className="q-image"></div>
            )}

            <div className="question">
                Question {`${index + 1}`}: {data.questionDescription}
            </div>
            <div className="answer">
                {data.answers &&
                    data.answers.length !== 0 &&
                    data.answers.map((a, index) => {
                        return (
                            <div key={`answer-${index}`} className="a-child">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={a.isSelected}
                                        onChange={(event) => {
                                            handleCheckBox2(
                                                event,
                                                a.id,
                                                data.questionId
                                            );
                                        }}
                                    />
                                    <label className="form-check-label">
                                        {a.description}
                                    </label>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default Question;
