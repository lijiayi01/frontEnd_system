import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import 'cq-ui-design/dist/index.css'
import App from './App'
import './index.css'
import './assets/styles/sass/common.scss'
import { Provider } from 'react-redux'
import store from './store'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>

)
