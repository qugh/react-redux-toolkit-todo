import { configureStore, combineReducers } from '@reduxjs/toolkit'
import todoSlice from "../reducers/todoReducer";

const reducers = {
    todoList: todoSlice
}

const rootReducer = combineReducers({...reducers})

const setupStore = () =>
    configureStore({
        reducer: rootReducer
    })


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]

export default setupStore;
