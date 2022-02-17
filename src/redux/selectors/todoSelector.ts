import { RootState } from '../store'

const getTodos = (state: RootState) => state.todoList

export const getMarkedTodosCount = (state: RootState) => {
  const isSomeTodoMarked = state.todoList.todos.some(
    (item) => item.isMarked === true
  )
  return !!isSomeTodoMarked
}

export default getTodos
