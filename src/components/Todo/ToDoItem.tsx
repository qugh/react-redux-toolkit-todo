import {
  FC,
  MouseEvent,
  useState,
  ChangeEvent,
  KeyboardEvent,
  FocusEvent,
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
import useAlert from '../../hooks/useAlert'
import { Snackbar } from '@mui/material'
import { nanoid } from '@reduxjs/toolkit'

interface ITodoItem extends ITodo {
  isOld: boolean
}

const ToDoItem: FC<ITodoItem> = ({ id, todoText, isOld, date }) => {
  const [editMode, setEditMode] = useState(false)
  const [todoValue, setTodoValue] = useState(todoText)
  const dispatch = useAppDispatch()
  const {
    alertStatus,
    alertText,
    setAlertStatus,
    setAlertText,
    handleExited,
    setSnackPack,
    action,
    handleCloseAlert
  } = useAlert()



  const TodoItem = () => (
    <>
      <div className={styles.todoText}>{todoText}</div>
      <div className={styles.todoDate}>{date}</div>
      <div className={styles.todoId}>id: {id}</div>
    </>
  )
  const showAlert = (message:string) => {
    debugger;
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }])
    setAlertText(`Todo with name '${todoValue} ${message}'`)
    setAlertStatus(true)
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    let message=todoText
    let key = new Date().getTime()
    setSnackPack((prev) => [...prev, { message, key}])
    dispatch(removeTodo(id))
    showAlert('deleted successfully')
  }

  const openEditMode = (e: MouseEvent<HTMLSpanElement>) => setEditMode(true)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTodoValue(e.currentTarget.value)

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
      showAlert('renamed successfully')
    } else {
      setTodoValue(todoText)
    }
    setEditMode(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' || e.code === 'Escape') editTodo()
  }

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.currentTarget.select()
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) =>
  {
    editTodo()
  }

  const handleClickRestore = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(restoreTodo(id))
    showAlert('restored successfully')
  }




  if (isOld)
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
        <Snackbar
          open={alertStatus}
          autoHideDuration={4000}
          onClose={handleCloseAlert}
          message={alertText}
          action={action}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          TransitionProps={{ onExited: handleExited }}
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
          onBlur={handleBlur}
          onFocus={handleFocus}
          autoFocus
        />
      ) : (
        <span onClick={openEditMode}>
          <TodoItem />
        </span>
      )}


      <TransparentButton
        text={closeTag}
        className={styles.action}
        onClick={handleClick}
      />
      <Snackbar
        open={alertStatus}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
        message={alertText}
        action={action}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        TransitionProps={{ onExited: handleExited }}
      />
    </>
  )
}

export default ToDoItem
