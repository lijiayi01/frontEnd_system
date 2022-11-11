import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Dialog from "./component/Dialog/index";
import Toast from "./component/Toast/index";
import './App.css'
import { Link, Route, Switch } from 'react-router-dom';
import DashBoard from './views/DashBoard';
import Login from './views/Login';
import React from 'react';
import { Button } from 'cq-ui-design';
interface IContext{
  mode: string,
  setTheme: (mode: string)=>void
}

const ThemeContext = React.createContext<any>(undefined);
function App() {

  const [mode, setMode] = useState('dark')

  function setTheme(mode: string){
    setMode(mode)
  }

  return (
    <ThemeContext.Provider value={
      {
        mode: mode,
        setTheme: setTheme
      }
    }>
      <div className="App">
        {/* <Dialog name='ljy' age={20} setName={setName}>
          <input type="text" placeholder='12345'/>
          <h2>自己假的元素</h2>
      </Dialog>
      <Toast msg='父元素传过来的内容'></Toast> */}
        <Button btnType='danger'>自定义ui按钮</Button>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={DashBoard} />
        </Switch>

      </div>
    </ThemeContext.Provider>

  )
}

export default App

export {
  ThemeContext
}
