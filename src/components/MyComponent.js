import React from "react";
import UserInfor from "./UserInfor.js";
import DisplayInfor from "./DisplayInfor.js";
class MyComponent extends React.Component {
    state = {
        listUser: [
            { id: 1, name: "Tai", age: "22" },
            { id: 2, name: "Tai2", age: "221" },
            { id: 3, name: "Tai3", age: "222" },
            { id: 4, name: "Tai4", age: "223" },
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
