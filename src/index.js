import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store,{history} from './store'
import Routes from './routes/index'
import './index.css'

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Routes />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
)