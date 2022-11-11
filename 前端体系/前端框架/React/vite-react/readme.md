# react + ts + react-router + redux 项目

## 注意点:

1. react 接入 ts, main.tsx 中`<React.Strict>`不能使用， 使用了会导致路由异常，跳转不了

2. react-router-dom: 5.2 这个版本之后有了`useRouteMatch`等 hook 方法，之后一般的组件再也不需要`withRouter`包裹了，直接使用相关 hook 方法即可

## redux 集成

`redux`: 状态管理包
`redux-thunk` : redux 处理异步 action

示例代码

```Javascript
import { combineReducers, createStore } from "redux";
import countReducer from "./countReducer";
import shopCarReducer from "./shopCarReducer";
const allReducer = combineReducers({
    count: countReducer,
    shopCar: shopCarReducer
})
const store = createStore(allReducer);

export default store

```

为了让组件可以更加简单的使用`store`，使用`react-redux`将 store 注入组件 props 中。

```
import { Provider } from 'react-redux'
<Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
```

组件：

```
import { connect } from "react-redux";
const mapStateToProps = (state: { count: ICount }) => {
    return {
        count: state.count
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        test: (num: number) => dispatch({
            type: 'add',
            payload: num
        })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
```
