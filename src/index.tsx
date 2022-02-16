import React from 'react'
import ReactDOM from 'react-dom'
import './styles/normalize.css'
import './styles/index.css'
import 'typeface-roboto'
import { Provider } from 'react-redux'
import setupStore from './redux/store'
import { BrowserRouter as Router } from 'react-router-dom'
import AppContainer from './app'

const store = setupStore()

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </Router>,
  document.getElementById('root')
)







