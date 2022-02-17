import { RootState } from '../store'
import { createDraftSafeSelector } from '@reduxjs/toolkit'

const getTodos = (state: RootState) => state.todoList

/*export const getIsSomeTodoMarked = (state: RootState) => {
  const isSomeTodoMarked = state.todoList.todos.some(
    (item) => item.isMarked === true
  )
  return isSomeTodoMarked
}*/

export const getIsSomeTodoMarkedSelector = createDraftSafeSelector(
  getTodos,
  (state) => state.todos.some((item) => item.isMarked === true)
)

export default getTodos
