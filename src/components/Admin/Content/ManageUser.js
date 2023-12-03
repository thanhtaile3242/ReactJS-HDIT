import ModalCreateUser from "./ModalCreateUser.js";
import TableUser from "./TableUser.js";
import { FcPlus } from "react-icons/fc";
import "./ManageUser.scss";
import { useState, useEffect } from "react";
import { getAllUsers } from "../../../services/apiService";
const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        fetchListUser();
    }, []);

    const fetchListUser = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUser(res.DT);
        }
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
                        <TableUser listUser={listUser} />
                    </div>
                    <ModalCreateUser
                        show={showModalCreateUser}
                        setShow={setShowModalCreateUser}
                        fetchListUser={fetchListUser}
                    />
                </div>
            </div>
        </>
    );
};
export default ManageUser;
