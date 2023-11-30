import logo from "./logo.svg";
import React from "react";
import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import { increaseCounter, decreaseCounter } from "./redux/action/counterAction";
import MyComponent from "./components/MyComponent.js";
class App extends React.Component {
    render() {
        return (
            <div>
                Hello World
                <MyComponent />
            </div>
        );
    }
}

// const App = () => {
//     const count = useSelector((state) => state.counter.count);
//     const dispatch = useDispatch();

//     return (
//         <div className="App">
//             <header className="App-header">
//                 <img src={logo} className="App-logo" alt="logo" />
//                 <p>Hello World with Le Thanh Tai</p>
//                 <div>Count = {count}</div>
//                 <button onClick={() => dispatch(increaseCounter())}>
//                     Increase
//                 </button>
//                 <button onClick={() => dispatch(decreaseCounter())}>
//                     Decrease
//                 </button>
//             </header>
//         </div>

//     );
// };

export default App;
