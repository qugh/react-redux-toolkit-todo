import {
  FC,
  MouseEvent,
  useState,
  ChangeEvent,
  KeyboardEvent,
  FocusEvent
} from 'react'
import { ITodo } from '../../types/Todo'
import {
  changeTodo,
  removeTodo,
  restoreTodo
} from '../../redux/reducers/todoReducer'
import { useAppDispatch } from '../../hooks/redux'
import styles from './ToDoItem.module.scss'
import Input from '@mui/material/Input'
import clsx from 'clsx'
import TransparentButton from '../TransparentButton/TransparentButton'
import { closeTag, restoreTag } from '../../constants/symbols'
import makeAlert, { actions } from '../../utils/makeAlert'

interface ITodoItem extends ITodo {
  isOld: boolean
  setSnackPack: any
}

const ToDoItem: FC<ITodoItem> = ({
                                   setSnackPack,
                                   id,
                                   todoText,
                                   isOld,
                                   date
                                 }) => {
  const [editMode, setEditMode] = useState(false)
  const [todoValue, setTodoValue] = useState(todoText)
  const dispatch = useAppDispatch()

  const showAlert = (action: typeof actions) => {
    setSnackPack((prev: any) => [
      ...prev,
      {
        message: makeAlert(action, todoText),
        key: new Date().getTime()
      }
    ])
  }

  const TodoItem = () => (
    <>
      <div className={styles.todoText}>{todoText}</div>
      <div className={styles.todoDate}>{date}</div>
      <div className={styles.todoId}>id: {id}</div>
    </>
  )
  const removeClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(removeTodo(id))
    showAlert('removeTodo')
  }

  const editTodo = () => {
    const isValueHasChanged = todoText !== todoValue
    if (todoValue && isValueHasChanged) {
      dispatch(
        changeTodo({
          id,
          todoText: todoValue,
          date: new Date().toLocaleString() + ' (changed)'
        })
      )
      showAlert('renameTodo')
    } else {
      setTodoValue(todoText)
    }
    setEditMode(false)
  }

  const openEditMode = (e: MouseEvent<HTMLSpanElement>) => setEditMode(true)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTodoValue(e.currentTarget.value)

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) =>
    (e.code === 'Enter' || e.code === 'Escape') && editTodo()

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.currentTarget.select()
  }

  const editOnBlurHandler = (e: FocusEvent<HTMLInputElement>) => editTodo()

  const handleClickRestore = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(restoreTodo(id))
    showAlert('restoreTodo')
  }
  if (isOld) return (<>
    <del className={styles.oldTodo}>
      <TodoItem />
    </del>
    <TransparentButton
      text={restoreTag}
      className={clsx([styles.action, styles.action__restore])}
      onClick={handleClickRestore}
    />
  </>
)
  return (
    <>
      {editMode ? (
        <Input
          value={todoValue}
          id={id}
          onChange={handleChange}
          sx={{ width: '30%' }}
          onKeyDown={handleKeyDown}
          onBlur={editOnBlurHandler}
          onFocus={handleFocus}
          autoFocus
        />
      ) :
         (
          <>
            <span onClick={openEditMode}>
              <TodoItem />
            </span>
            <TransparentButton
              text={closeTag}
              className={styles.action}
              onClick={removeClickHandler}
            />
          </>
        )
      }
    </>
  )
}
export default ToDoItem
