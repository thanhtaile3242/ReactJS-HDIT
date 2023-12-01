import React, { useState, useEffect } from "react";

// class AddUserInfor extends React.Component {
//     state = {
//         name: "",
//         age: "",
//     };

//     handleClick = (event) => {
//         this.setState({
//             name: "Thanh Tai",
//             age: Math.floor(Math.random() * 100 + 1),
//         });
//         console.log("My name is", this.state.name);
//     };

//     handleOnChange = (event) => {
//         this.setState({
//             name: event.target.value,
//         });
//     };
//     handleOnChangeAge = (event) => {
//         this.setState({
//             age: event.target.value,
//         });
//     };

//     handleOnSubmit = (event) => {
//         event.preventDefault();
//         this.props.handleAddNewUser({
//             id: Math.floor(Math.random() * 100 + 1) + "-random",
//             name: this.state.name,
//             age: this.state.age,
//         });
//     };
//     render() {
//         return (
//             <div>
//                 My name is {this.state.name} My age is {this.state.age}
//                 <br />
//                 <form
//                     onSubmit={(event) => {
//                         this.handleOnSubmit(event);
//                     }}
//                 >
//                     <label>Your name: </label>
//                     <input
//                         type="text"
//                         onChange={(event) => {
//                             this.handleOnChange(event);
//                         }}
//                         value={this.state.name}
//                     />

//                     <label>Your age: </label>
//                     <input
//                         type="text"
//                         onChange={(event) => {
//                             this.handleOnChangeAge(event);
//                         }}
//                         value={this.state.age}
//                     />
//                     <button>Submit</button>
//                 </form>
//             </div>
//         );
//     }
// }

const AddUserInfor = (props) => {
    const [nameInfor, setName] = useState("");
    const [ageInfor, setAge] = useState("");
    const handleAddNewUser = props.handleAddNewUser;
    //
    const handleOnChangeName = (event) => {
        setName(event.target.value);
    };
    const handleOnChangeAge = (event) => {
        setAge(event.target.value);
    };

    const handleOnSubmit = (event) => {
        event.preventDefault();
        handleAddNewUser({
            id: Math.floor(Math.random() * 100 + 1) + "-random",
            name: nameInfor,
            age: ageInfor,
        });
    };

    return (
        <>
            My name is {nameInfor} My age is {ageInfor}
            <br />
            <form
                onSubmit={(event) => {
                    handleOnSubmit(event);
                }}
            >
                <label>Your name: </label>
                <input
                    type="text"
                    onChange={(event) => {
                        handleOnChangeName(event);
                    }}
                    value={nameInfor}
                />

                <label>Your age: </label>
                <input
                    type="text"
                    onChange={(event) => {
                        handleOnChangeAge(event);
                    }}
                    value={ageInfor}
                />
                <button>Submit</button>
            </form>
        </>
    );
};

export default AddUserInfor;
