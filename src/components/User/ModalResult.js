import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import axios from "axios";
const ModalResult = (props) => {
    const { show, setShow, dataModalResult } = props;

    const handleClose = () => {
        setShow(false);
    };
    console.log(dataModalResult);
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Your Result ...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Total Questions: <b>{dataModalResult.countTotal}</b>
                    </div>
                    <div>
                        Total Correct Answers:{" "}
                        <b>{dataModalResult.countCorrect}</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Show answers
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalResult;
