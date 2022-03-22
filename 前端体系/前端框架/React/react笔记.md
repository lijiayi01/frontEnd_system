# react学习笔记

react在16.8之后的版本支持hook, 之前的版本没有hook功能。

## 1. 搭建react + react-router项目

### 1. 环境准备

使用create-react-app脚手架创建项目, 安装react-router-dom(不需要单独安装react-router)

### 2. 路由管理

在react的思维中, 路由也是一个组件，它一般的编写方式为:

```
        <HashRouter>
            <Switch>
                <Route path="/dashboard" component={App}></Route>
                <Route path="/info" component={Info}></Route>
                <Route path="/login" component={Info}></Route>
                <Route path="/a" component={Tabbar}></Route>
                <AuthRoute exact path="/" component={Info} />
            </Switch>
        </HashRouter>
```

组件可以分为路由组件和普通组件，路由组件就是上面Route指向的组件，它本身的props里包含了history location等路由信息。

路由组件的跳转方式:
```
        this.props.history.push({
            pathname: '/',
            query: {
                id: 211
            }
        })
```

普通组件的props不包含history location等路由信息，需要withRouter包裹才能获取到路由相关信息

```
        import {withRouter} from 'react-router-dom'
        const Button = (props)=>{
            console.log(props.location)
            const href = ()=>{
                props.history.push({
                    pathname: '/',
                    query: {
                        id: 211
                    }
                })
            }
            
            return <div>
                <button onClick={()=>{href()}}>按钮1</button>
                <button>按钮2</button>
            </div>
        }

        export default withRouter(Button)
```
