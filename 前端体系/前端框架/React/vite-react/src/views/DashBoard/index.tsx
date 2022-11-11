import { Link, Redirect, Route, Switch } from "react-router-dom"
import About from "../About"
import Home from "../Home"
import State from "../State"

function DashBoard() {
    return (
        <div className="common-title">
            页面路由
            <ul>
                <li>
                    <Link to="/home">home</Link>
                </li>
                <li>
                    <Link to="/about">about</Link>
                </li>
                <li>
                    <Link to="/state">state</Link>
                </li>
            </ul>
            <div id="view">
                <Switch>
                    <Route path="/home" component={Home}></Route>
                    <Route path="/about" component={About}></Route>
                    <Route path="/state" component={State}></Route>
                    <Redirect to="/home"></Redirect>
                </Switch>

            </div>
        </div>
    )
}

export default DashBoard