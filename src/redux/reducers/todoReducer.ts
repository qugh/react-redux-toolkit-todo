import {
  createSlice,
  PayloadAction,
  nanoid,
} from '@reduxjs/toolkit'
import { ITodo } from '../../types/Todo'

const todoSliceName = 'todo'

interface ITodos {
  todos: Array<ITodo>
}

const initialState: ITodos = {
  todos: [],
}

const todoSlice = createSlice({
  name: todoSliceName,
  initialState,
  reducers: {
    addTodo: {
      reducer(state: ITodos, action: PayloadAction<ITodo>) {
        state.todos.unshift(action.payload)
      },
      prepare(todoText) {
        return {
          payload: {
            id: nanoid(16),
            todoText,
            date: new Date().toISOString(),
            isMarked: false,
          },
        }
      },
    },
    // addTodo:{ reducer(state: ITodos, action: PayloadAction<ITodo>) => {
    //   action.payload.isMarked = false
    //   state.todos.unshift(action.payload)
    // },
    removeTodo: (state: ITodos, action: PayloadAction<string>) => {
      const todoIdIndex = state.todos.findIndex(
        (item) => item.id === action.payload
      )
      state.todos[todoIdIndex].isMarked = true
      state.todos.push(state.todos.splice(todoIdIndex, 1)[0]) // перемещаем удаленный элемент в конец
      // state.oldTodos.unshift(oldTodo!)
      // state.todos = state.todos.filter((item) => item.id !== action.payload)
    },
    changeTodo: {
      reducer(state: ITodos, action: PayloadAction<ITodo>) {
        const { id, todoText } = action.payload
        const existingTodo = state.todos.find((todo) => todo.id === id)
        if (existingTodo) {
          existingTodo.todoText = todoText
        }
      },
      prepare(id, todoText) {
        return {
          payload: {
            id,
            todoText,
          },
        }
      },
    },
    restoreTodo: (state: ITodos, action: PayloadAction<string>) => {
      const restoredTodo = state.todos.find(
        (todo) => todo.id === action.payload
      )
      if (restoredTodo) {
        restoredTodo.isMarked = false
      }
    },
    // const todoIdIndex = state.todos.findIndex(
    //   (item) => item.id === action.payload
    // )
    // state.todos[todoIdIndex].isMarked = false
    // state.todos.unshift(state.todos.splice(todoIdIndex,1)[0]) // перемещаем восстановленный элемент в начало
    removeAllTodos: (state: ITodos) => {
      state.todos = state.todos.filter((item) => item.isMarked !== true)
    },
  },
})

export const { addTodo, removeTodo, changeTodo, restoreTodo, removeAllTodos } =
  todoSlice.actions

export default todoSlice.reducer
