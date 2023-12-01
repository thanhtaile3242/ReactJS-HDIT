import React, { useState } from "react";
import AddUserInfor from "./AddUserInfor.js";
import DisplayInfor from "./DisplayInfor.js";
// class MyComponent extends React.Component {
//     state = {
//         listUser: [
//             { id: 1, name: "Tai", age: "20" },
//             { id: 2, name: "Tai2", age: "30" },
//             { id: 3, name: "Tai3", age: "18" },
//             { id: 4, name: "Tai4", age: "27" },
//         ],
//     };

//     handleAddNewUser = (userObj) => {
//         this.setState({
//             listUser: [userObj, ...this.state.listUser],
//         });
//     };

//     handleDeleteUser = (userId) => {
//         let listUserClone = [...this.state.listUser];
//         listUserClone = listUserClone.filter((item) => item.id !== userId);
//         this.setState({ listUser: listUserClone });
//     };
//     render() {
//         return (
//             <div>
//                 <AddUserInfor handleAddNewUser={this.handleAddNewUser} />
//                 <br />
//                 <br />
//                 <DisplayInfor
//                     listUser={this.state.listUser}
//                     handleDeleteUser={this.handleDeleteUser}
//                 />
//             </div>
//         );
//     }
// }

const MyComponent = (props) => {
    const [listUser, setListUser] = useState([
        { id: 1, name: "Tai", age: "20" },
        { id: 2, name: "Tai2", age: "30" },
        { id: 3, name: "Tai3", age: "18" },
        { id: 4, name: "Tai4", age: "27" },
    ]);
    const handleAddNewUser = (userObj) => {
        setListUser([userObj, ...listUser]);
    };
    const handleDeleteUser = (userId) => {
        let listUserClone = [...listUser];
        listUserClone = listUserClone.filter((item) => item.id !== userId);
        setListUser(listUserClone);
    };
    return (
        <>
            <div>
                <AddUserInfor handleAddNewUser={handleAddNewUser} />
                <br />
                <br />
                <DisplayInfor
                    listUser={listUser}
                    handleDeleteUser={handleDeleteUser}
                />
            </div>
        </>
    );
};

export default MyComponent;
