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

interface ITodoItem extends ITodo {
  isOld: boolean
}

const ToDoItem: FC<ITodoItem> = ({ id, todoText, isOld }) => {
  const [editMode, setEditMode] = useState(false)
  const [todoValue, setTodoValue] = useState(todoText)
  const dispatch = useAppDispatch()

  const TodoItem = () => (
    <>
      <div className={styles.todoText}>{todoText}</div>
      <div className={styles.todoId}>id: {id}</div>
    </>
  )

  const handleClick = (e: MouseEvent<HTMLButtonElement>) =>
    dispatch(removeTodo(id))

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
        })
      )
    } else {
      setTodoValue(todoText)
    }
    setEditMode(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Escape' || e.code === 'Enter') editTodo()
  }

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.currentTarget.select()
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => editTodo()

  const handleClickRestore = (e: MouseEvent<HTMLSpanElement>) =>
    dispatch(restoreTodo(id))

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


    </>
  )
}

export default ToDoItem
