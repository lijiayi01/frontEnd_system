import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {useLocation, useRouteMatch,  } from "react-router-dom";
import Styles from "@/assets/styles/css/dialog.module.css";
import { ThemeContext } from "@/App";

interface IDialogProps {
    name: string,
    age: number,
    setName: ()=>void,
    children: React.ReactNode,
    [key: string]: any
}

const Dialog: React.FC<IDialogProps> = (props)=>{
    console.log('渲染dialog')
    const [count, setCount] = useState(0)
    const {name, age, setName, children} = props;
    const theme = useContext(ThemeContext)
    console.log(theme, 'context')
    useLayoutEffect(()=>{
        console.log('绘制前hook')
    })
    useEffect(()=>{
        document.title = '标题' + count;
        const timer = setInterval(()=>{
            // console.log('定时器')
        }, 2000)

        return function(){
            clearInterval(timer)
        }
    }, [])
    return (
        <div onClick={setName} className={Styles.dialog + ' ljy'}>
            <div>
                <h1>当前的mode: {theme.mode}</h1>
            <h1>you click {count} times</h1>
            <input type="button" onClick={()=> setCount(count + 1)} value="click me" /> 
            <input type="button" onClick={()=> theme.setTheme('light')} value="修改全局context" /> 
            </div>
            <div>------------------------------------------------------</div>
            我是1个dialog {name} - {age}
            {children}
        </div>
    )
}


export default Dialog;
