import React, { useState, useEffect } from "react";
import "./DisplayInfor.scss";
import logo from "../logo.svg";
// class DisplayInfor1 extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isShowHide: true,
//         };
//     }

//     handleShowHide = () => {
//         this.setState({
//             isShowHide: !this.state.isShowHide,
//         });
//     };
//     render() {
//         const { listUser } = this.props;

//         return (
//             <>
//                 <div className="display-infor-container">
//                     <img src={logo} className="logo" />
//                     <div>
//                         <span
//                             onClick={() => {
//                                 this.handleShowHide();
//                             }}
//                         >
//                             {this.state.isShowHide
//                                 ? "Hide list users"
//                                 : "Show list users"}
//                         </span>
//                     </div>
//                     {this.state.isShowHide && (
//                         <div>
//                             {listUser.map((user) => {
//                                 return (
//                                     <div
//                                         key={user.id}
//                                         className={
//                                             +user.age > 24 ? "green" : "red"
//                                         }
//                                     >
//                                         <div
//                                         // style={{
//                                         //     color: "blue",
//                                         //     paddingTop: "50px",
//                                         // }}
//                                         >
//                                             My name is {user.name}
//                                         </div>
//                                         <div>My age is {user.age} </div>
//                                         <div>
//                                             <button
//                                                 onClick={() => {
//                                                     this.props.handleDeleteUser(
//                                                         user.id
//                                                     );
//                                                 }}
//                                             >
//                                                 Delete
//                                             </button>
//                                         </div>
//                                         <hr />
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     )}
//                 </div>
//             </>
//         );
//     }
// }
const DisplayInfor = (props) => {
    const { listUser } = props;
    const handleDeleteUser = props.handleDeleteUser;
    const [isShowHideListUser, setShowHideListUser] = useState(true);
    const handleShowHide = () => {
        setShowHideListUser(!isShowHideListUser);
    };
    useEffect(() => {
        if (listUser.length === 0) {
            alert("Delete all");
        }
        console.log("call me useEffect");
    }, [listUser]);
    return (
        <>
            <div className="display-infor-container">
                <div>
                    <span
                        onClick={() => {
                            handleShowHide();
                        }}
                    >
                        Show list users
                    </span>
                </div>

                {isShowHideListUser && (
                    <div>
                        {listUser.map((user) => {
                            return (
                                <div
                                    key={user.id}
                                    className={+user.age > 24 ? "green" : "red"}
                                >
                                    <div>My name is {user.name}</div>
                                    <div>My age is {user.age} </div>
                                    <div>
                                        <button
                                            onClick={() => {
                                                handleDeleteUser(user.id);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    <hr />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
};
export default DisplayInfor;
