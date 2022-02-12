import {RootState} from "../store";


export const getTodos = (state:RootState) => {
    return state.todoList
}

export const getNewTodoId = (state:RootState) => {
    return state.todoList.newIdValue
}

