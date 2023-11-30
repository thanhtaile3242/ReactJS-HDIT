import React from "react";

class UserInfor extends React.Component {
    state = {
        name: "eric",
        address: "Hoi dan IT",
        age: 22,
    };

    handleClick = (event) => {
        this.setState({
            name: "Thanh Tai",
            age: Math.floor(Math.random() * 100 + 1),
        });
        console.log("My name is", this.state.name);
    };

    handleOnChange = (event) => {
        this.setState({
            name: event.target.value,
        });
    };
    handleOnChangeAge = (event) => {
        this.setState({
            age: event.target.value,
        });
    };

    handleOnSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    };
    render() {
        return (
            <div>
                My name is {this.state.name} My age is {this.state.age}
                <br />
                <form
                    onSubmit={(event) => {
                        this.handleOnSubmit(event);
                    }}
                >
                    <label>Your name: </label>
                    <input
                        type="text"
                        onChange={(event) => {
                            this.handleOnChange(event);
                        }}
                        value={this.state.name}
                    />

                    <label>Your age: </label>
                    <input
                        type="text"
                        onChange={(event) => {
                            this.handleOnChangeAge(event);
                        }}
                        value={this.state.age}
                    />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default UserInfor;
