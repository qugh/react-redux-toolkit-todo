export let actions:
  | 'renameTodo'
  | 'removeTodo'
  | 'restoreTodo'
  | 'addTodo'
  | 'removeAllTodos'

type actionTypes = typeof actions

const makeAlert = (action: actionTypes, text?: string) => {
  let message: string
  switch (action) {
    case 'addTodo': {
      message = `Todo with name ${text?.toUpperCase()} added successfully`
      break
    }
    case 'removeTodo':
      message = `Todo with name ${text?.toUpperCase()} removed successfully`
      break
    case 'renameTodo':
      message = `Todo with name ${text?.toUpperCase()} renamed successfully `
      break
    case 'restoreTodo':
      message = `Todo with name ${text?.toUpperCase()} restored successfully`
      break
    case 'removeAllTodos': {
      message = `Marked todos removed`
      break
    }
    default:
      message = `Some error occurred`
  }
  return message
}

export default makeAlert
