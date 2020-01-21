// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React, { useState } from "react";
import ReactDOM from "react-dom";

// function Child1(porps) {
//   console.log(porps);
//   const { num, handleClick } = porps;
//   return (
//     <div
//       onClick={() => {
//         handleClick(num + 1);
//       }}
//     >
//       child
//     </div>
//   );
// }

// function Child2(porps) {
//   console.log(porps);
//   const { text, handleClick } = porps;
//   return (
//     <div>
//       child2
//       <Grandson text={text} handleClick={handleClick} />
//     </div>
//   );
// }

// function Grandson(porps) {
//   console.log(porps);
//   const { text, handleClick } = porps;
//   return (
//     <div
//       onClick={() => {
//         handleClick(text + 1);
//       }}
//     >
//       grandson
//     </div>
//   );
// }

// function Parent() {
//   let [num, setNum] = useState(0);
//   let [text, setText] = useState(1);

//   return (
//     <div>
//       <Child1 num={num} handleClick={setNum} />
//       <Child2 text={text} handleClick={setText} />
//     </div>
//   );
// }

// function Counter2(){
//     let [number,setNumber] = useState(0);
//     function alertNumber(){
//       setTimeout(()=>{
//         number+=1
//         // alert 只能获取到点击按钮时的那个状态
//         alert(number);
//       },3000);
//     }
//     return (
//         <>
//             <p>{number}</p>
//             <button onClick={()=>setNumber(number+1)}>+</button>
//             <button onClick={alertNumber}>alertNumber</button>
//         </>
//     )
//   }


// function Counter(){
//     let [number,setNumber] = useState(0);
//     function lazy(){
//         setTimeout(() => {
//             // setNumber(number+1);
//             // 这样每次执行时都会去获取一遍 state，而不是使用点击触发时的那个 state
//             setNumber(number=>number+1);
//         }, 3000);
//     }
//     return (
//         <>
//            <p>{number}</p>
//            <button onClick={()=>setNumber(number+1)}>+</button>
//            <button onClick={lazy}>lazy</button>
//         </>
//     )
// }
function Example() {
    // 声明一个叫 "count" 的 state 变量
    const [count, setCount] = useState(0);
  
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
  }
  
const rootElement = document.getElementById("root");
ReactDOM.render(<Example />, rootElement);
