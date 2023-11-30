import React from "react";
import UserInfor from "./UserInfor.js";
import DisplayInfor from "./DisplayInfor.js";
class MyComponent extends React.Component {
    state = {
        listUser: [
            { id: 1, name: "Tai", age: "20" },
            { id: 2, name: "Tai2", age: "30" },
            { id: 3, name: "Tai3", age: "18" },
            { id: 4, name: "Tai4", age: "27" },
        ],
    };
    render() {
        const myInfor = {
            name: "thanh tai",
            age: 22,
        };
        return (
            <div>
                <UserInfor />
                <br />
                <br />
                <DisplayInfor listUser={this.state.listUser} />
            </div>
        );
    }
}

export default MyComponent;
