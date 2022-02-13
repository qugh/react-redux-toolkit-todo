import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITodo } from '../../types/Todo'

const todoSliceName = 'todo'

interface ITodos {
  todos: Array<ITodo>
  deletedTodos: Array<ITodo>
}

const initialState: ITodos = {
  todos: [],
  deletedTodos: [],
}

const todoSlice = createSlice({
  name: todoSliceName,
  initialState,
  reducers: {
    addTodo: (state: ITodos, action: PayloadAction<ITodo>) => {
      state.todos.push(action.payload)
    },
    removeTodo: (state: ITodos, action: PayloadAction<string>) => {
      const oldTodo = state.todos.find((item) => item.id === action.payload)
      state.deletedTodos.push(oldTodo!)
      state.todos = state.todos.filter((item) => item.id !== action.payload)
    },
    changeTodo: (state: ITodos, action: PayloadAction<ITodo>) => {
      const todoIdIndex = state.todos.findIndex(
        (item) => item.id === action.payload.id)
      state.todos[todoIdIndex] = action.payload
    },
  },
})

export const { addTodo, removeTodo, changeTodo } = todoSlice.actions

export default todoSlice.reducer
