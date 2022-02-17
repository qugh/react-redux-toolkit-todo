export enum actions2 {
  RENAME_TODO = 'renameTodo',
  REMOVE_TODO = 'removeTodo',
  RESTORE_TODO = 'restoreTodo',
  ADD_TODO = 'addTodo',
  REMOVE_ALL_TODOS = 'removeAllTodos',
}

const { RENAME_TODO, REMOVE_TODO, RESTORE_TODO, REMOVE_ALL_TODOS, ADD_TODO } =
  actions2

const makeAlert = (action: actions2, text?: string) => {
  let message: string
  switch (action) {
    case  ADD_TODO: {
      message = `Todo with name ${text?.toUpperCase()} added successfully`
      break
    }
    case REMOVE_TODO:
      message = `Todo with name ${text?.toUpperCase()} removed successfully`
      break
    case RENAME_TODO:
      message = `Todo with name ${text?.toUpperCase()} renamed successfully `
      break
    case RESTORE_TODO:
      message = `Todo with name ${text?.toUpperCase()} restored successfully`
      break
    case REMOVE_ALL_TODOS: {
      message = `Marked todos removed`
      break
    }
    default:
      message = `Some error occurred`
  }
  return message
}

export default makeAlert
