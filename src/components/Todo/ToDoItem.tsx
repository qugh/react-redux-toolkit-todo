import {
  FC,
  MouseEvent,
  useState,
  ChangeEvent,
  KeyboardEvent,
  FocusEvent,
  useEffect,
} from 'react'
import { ITodo } from '../../types/Todo'
import {
  changeTodo,
  removeTodo,
  restoreTodo,
} from '../../redux/reducers/todoReducer'
import { useAppDispatch } from '../../hooks/redux'
import styles from './ToDoItem.module.scss'
import Input from '@mui/material/Input'
import clsx from 'clsx'
import TransparentButton from '../TransparentButton/TransparentButton'
import { closeTag, restoreTag } from '../../constants/symbols'
import makeAlert, { actions2 } from '../../utils/makeAlert'
import { timeAgo } from '../../features/todo/timeAgo'

const { RESTORE_TODO, REMOVE_TODO, RENAME_TODO } = actions2

interface ITodoItem extends ITodo {
  setSnackPack: any
}

const ToDoItem: FC<ITodoItem> = ({
  setSnackPack,
  id,
  todoText,
  date,
  isMarked,
}) => {
  const [editMode, setEditMode] = useState(false)
  const [todoValue, setTodoValue] = useState(todoText)
  const dispatch = useAppDispatch()
  const showAlert = (action: actions2) => {
    setSnackPack((prev: any) => [
      ...prev,
      {
        message: makeAlert(action, todoText),
        key: new Date().getTime(),
      },
    ])
  }

  const TodoItem = () => (
    <>
      <div className={styles.todoText}>{todoText}</div>
      <div className={styles.todoDate}>{timeAgo(date)}</div>
      <div className={styles.todoId}>id: {id}</div>
    </>
  )
  const removeClickHandler = () => {
    dispatch(removeTodo(id))
    showAlert(REMOVE_TODO)
  }

  const editTodo = () => {
    const isValueHasChanged = todoText !== todoValue
    if (todoValue && isValueHasChanged) {
      dispatch(changeTodo(id, todoValue))
      showAlert(RENAME_TODO)
    } else {
      setTodoValue(todoText)
    }
    setEditMode(false)
  }

  const openEditMode = () => setEditMode(true)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTodoValue(e.currentTarget.value)

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) =>
    (e.code === 'Enter' || e.code === 'Escape') && editTodo()

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.currentTarget.select()
  }

  const editOnBlurHandler = () => editTodo()

  const handleClickRestore = () => {
    dispatch(restoreTodo(id))
    showAlert(RESTORE_TODO)
  }

  if (isMarked)
    return (
      <>
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
      ) : (
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
      )}
    </>
  )
}
export default ToDoItem
