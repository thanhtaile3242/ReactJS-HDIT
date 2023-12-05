import ModalCreateUser from "./ModalCreateUser.js";
import ModalUpdateUser from "./ModalUpdateUser.js";
import ModalViewUser from "./ModalViewUser.js";
import ModalDeleteUser from "./ModalDeleteUser.js";
import TableUserPaginate from "./TableUserPaginate.js";
import { FcPlus } from "react-icons/fc";
import "./ManageUser.scss";
import { useState, useEffect } from "react";
import { getAllUsers, getUserPaginate } from "../../../services/apiService";
const ManageUser = (props) => {
    const LIMIT_USER = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        fetchListUserPaginate(currentPage);
    }, []);

    const fetchListUser = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUser(res.DT);
        }
    };

    const fetchListUserPaginate = async (page) => {
        let res = await getUserPaginate(page, LIMIT_USER);
        if (res.EC === 0) {
            setListUser(res.DT.users);
            setPageCount(res.DT.totalPages);
        }
    };

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
    };

    const handleClickBtnView = (user) => {
        setShowModalViewUser(true);
        setDataUpdate(user);
    };

    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true);
        setDataUpdate(user);
    };

    return (
        <>
            <div className="manage-user-container">
                <div className="title">ManageUser</div>
                <div className="users-content">
                    <div className="btn-add-new">
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                setShowModalCreateUser(true);
                            }}
                        >
                            <FcPlus />
                            Add new user
                        </button>
                    </div>
                    <div className="table-users-container">
                        {/* <TableUser
                            listUser={listUser}
                            handleClickBtnUpdate={handleClickBtnUpdate}
                            handleClickBtnView={handleClickBtnView}
                            handleClickBtnDelete={handleClickBtnDelete}
                        /> */}
                        <TableUserPaginate
                            listUser={listUser}
                            handleClickBtnUpdate={handleClickBtnUpdate}
                            handleClickBtnView={handleClickBtnView}
                            fetchListUserPaginate={fetchListUserPaginate}
                            pageCount={pageCount}
                            handleClickBtnDelete={handleClickBtnDelete}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                    <ModalCreateUser
                        show={showModalCreateUser}
                        setShow={setShowModalCreateUser}
                        fetchListUser={fetchListUser}
                        fetchListUserPaginate={fetchListUserPaginate}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />

                    <ModalUpdateUser
                        show={showModalUpdateUser}
                        setShow={setShowModalUpdateUser}
                        dataUpdate={dataUpdate}
                        fetchListUser={fetchListUser}
                        setDataUpdate={setDataUpdate}
                        fetchListUserPaginate={fetchListUserPaginate}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                    <ModalViewUser
                        show={showModalViewUser}
                        setShow={setShowModalViewUser}
                        dataUpdate={dataUpdate}
                        setDataUpdate={setDataUpdate}
                    />

                    <ModalDeleteUser
                        show={showModalDeleteUser}
                        setShow={setShowModalDeleteUser}
                        dataUpdate={dataUpdate}
                        fetchListUser={fetchListUser}
                        setDataUpdate={setDataUpdate}
                        fetchListUserPaginate={fetchListUserPaginate}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        </>
    );
};
export default ManageUser;
