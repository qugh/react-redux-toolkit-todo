import React, { FC,StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import './styles/normalize.css'
import {Provider} from "react-redux";
import setupStore from "./redux/store";
import {BrowserRouter as Router, Routes, Navigate, Route} from "react-router-dom";
import routes from "./constants/routes";
import {useRoutes} from "react-router-dom";

interface AppState {}
const store = setupStore()
const AppContainer: FC<AppState> = () => {
    let element = useRoutes(routes)
    return (
        <StrictMode>
            <Provider store={store}>
                {element}
            </Provider>
        </StrictMode>

    )
}

ReactDOM.render(<AppContainer />, document.getElementById('root'))
