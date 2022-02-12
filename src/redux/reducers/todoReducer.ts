import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITodo} from '../../types/Todo'

const todoSliceName = 'todo'

interface ITodos {
    todos: Array<ITodo>,
    newIdValue: number
}

const initialState:ITodos = {
    todos: [

    ],
    newIdValue: 1
}

const todoSlice = createSlice({
    name: todoSliceName,
    initialState,
    reducers: {
        addTodo: (state: ITodos, action: PayloadAction<ITodo>) => {
            state.todos.push(action.payload)
            state.newIdValue++
        },
        removeTodo: (state: ITodos, action: PayloadAction<number>) => {
            state.todos = state.todos.filter((item)=> item.id !== action.payload)
           // state.newIdValue=action.payload надо реализовать нормально систему ID, никогда такого не делал.
        }
    }
})

export const {addTodo,removeTodo} = todoSlice.actions

export default todoSlice.reducer