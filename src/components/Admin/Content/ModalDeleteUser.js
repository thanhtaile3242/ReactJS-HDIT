import { useState } from "react";
import { deleteUser } from "../../../services/apiService";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import axios from "axios";
const ModalDeleteUser = (props) => {
    const { show, setShow, dataUpdate, setDataUpdate } = props;

    const handleClose = () => {
        setShow(false);
        setDataUpdate({});
    };

    const handleSubmitDeleteUser = async () => {
        const data = await deleteUser(dataUpdate.id);

        if (data?.EC === 0) {
            toast.success(data.EM);
            handleClose();
            // await props.fetchListUser();
            props.setCurrentPage(1);
            await props.fetchListUserPaginate(1);
        }
        if (data?.EC !== 0) {
            toast.error(data.EM);
        }
    };
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete The User?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure to delete this user. Email:
                    <b>{dataUpdate.email}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDeleteUser}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDeleteUser;
