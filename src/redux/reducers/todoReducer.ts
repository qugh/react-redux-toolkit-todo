import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITodo } from '../../types/Todo'

const todoSliceName = 'todo'

interface ITodos {
  todos: Array<ITodo>
  oldTodos: Array<ITodo>
}

const initialState: ITodos = {
  todos: [],
  oldTodos: [],
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
      state.oldTodos.push(oldTodo!)
      state.todos = state.todos.filter((item) => item.id !== action.payload)
    },
    changeTodo: (state: ITodos, action: PayloadAction<ITodo>) => {
      const todoIdIndex = state.todos.findIndex(
        (item) => item.id === action.payload.id)
      state.todos[todoIdIndex] = action.payload
    },
    restoreTodo: (state:ITodos, action: PayloadAction<string>)=> {
      const newTodo = state.oldTodos.find((item)=> item.id === action.payload)
      state.todos.push(newTodo!)
      state.oldTodos = state.oldTodos.filter((item) => item.id !== action.payload)
    },
    removeAllTodos: (state:ITodos, action: PayloadAction) => {
      state.todos = []
      state.oldTodos = []
    }
  },
})

export const { addTodo, removeTodo, changeTodo,restoreTodo,removeAllTodos } = todoSlice.actions

export default todoSlice.reducer
