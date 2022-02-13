import { RootState } from '../store'

const getTodos = (state: RootState) => state.todoList

export default getTodos
