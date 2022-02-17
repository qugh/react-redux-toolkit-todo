import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITodo } from '../../types/Todo'

const todoSliceName = 'todo'

interface ITodos {
  todos: Array<ITodo>
  // oldTodos: Array<ITodo>
}

const initialState: ITodos = {
  todos: [],
  // oldTodos: [], //Todo перенести все в один массив и сделал isOld
}

const todoSlice = createSlice({
  name: todoSliceName,
  initialState,
  reducers: {
    addTodo: (state: ITodos, action: PayloadAction<ITodo>) => {
      action.payload.isMarked = false
      state.todos.unshift(action.payload)
    },
    removeTodo: (state: ITodos, action: PayloadAction<string>) => {
      const todoIdIndex = state.todos.findIndex(
        (item) => item.id === action.payload
      )
      state.todos[todoIdIndex].isMarked = true
      state.todos.push(state.todos.splice(todoIdIndex,1)[0]) // перемещаем удаленный элемент в конец
      // state.oldTodos.unshift(oldTodo!)
      // state.todos = state.todos.filter((item) => item.id !== action.payload)
    },
    changeTodo: (state: ITodos, action: PayloadAction<ITodo>) => {
      const todoIdIndex = state.todos.findIndex(
        (item) => item.id === action.payload.id
      )
      state.todos[todoIdIndex] = action.payload
    },
    restoreTodo: (state: ITodos, action: PayloadAction<string>) => {
      const todoIdIndex = state.todos.findIndex(
        (item) => item.id === action.payload
      )
      state.todos[todoIdIndex].isMarked = false
      state.todos.unshift(state.todos.splice(todoIdIndex,1)[0]) // перемещаем восстановленный элемент в начало
/*      state.todos.push(newTodo!)
      state.oldTodos = state.oldTodos.filter(
        (item) => item.id !== action.payload
      )*/
    },
    removeAllTodos: (state: ITodos) => {
      //state.todos = []
      state.todos = state.todos.filter((item) => item.isMarked !== true)
    },
  },
})

export const { addTodo, removeTodo, changeTodo, restoreTodo, removeAllTodos } =
  todoSlice.actions

export default todoSlice.reducer
