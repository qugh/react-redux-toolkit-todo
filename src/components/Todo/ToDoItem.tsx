import {
  FC,
  MouseEvent,
  useState,
  ChangeEvent,
  KeyboardEvent,
  FocusEvent,
} from 'react'
import { ITodo } from '../../types/Todo'
import { changeTodo, removeTodo, restoreTodo } from '../../redux/reducers/todoReducer'
import { useAppDispatch } from '../../hooks/redux'
import styles from './ToDoItem.module.scss'
import Input from '@mui/material/Input'
import clsx from 'clsx'

interface ITodoItem extends ITodo {
  isOld: boolean
}

const ToDoItem: FC<ITodoItem> = ({ id, name, isOld }) => {
  const [editMode, setEditMode] = useState(false)
  const [todoValue, setTodoValue] = useState(name)
  const dispatch = useAppDispatch()

  const handleClick = (event: MouseEvent<HTMLLIElement>) => {
    dispatch(removeTodo(event.currentTarget.id))
  }
  const closeTag: string = '\u2716'
  const restoreTag: string = '\u21F5'

  const openEditMode = (e: MouseEvent<HTMLSpanElement>) => {
    setEditMode(true)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoValue(event.currentTarget.value)
  }

  const editTodo = () => {
    const isValueHasChanged = name !== todoValue
    if (todoValue && isValueHasChanged) {
      dispatch(
        changeTodo({
          id,
          name: todoValue,
        })
      )
    } else {
      setTodoValue(name)
    }

    setEditMode(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Escape' || e.code === 'Enter') editTodo()
  }
  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.currentTarget.select()
  }
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    editTodo()
  }
  const handleClickRestore = (e:MouseEvent<HTMLSpanElement>) => {
    dispatch(restoreTodo(id))
  }

  if (isOld)
    return (
      <>
        <del className={styles.oldTodo}>
          <div className={styles.todoText}>{name}</div>
          <div className={styles.todoId}>id: {id}</div>
        </del>

        <span
          id={id}
          className={clsx([styles.action, styles.action__restore])}
          onClick={handleClickRestore}
        >
          {restoreTag}
        </span>
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
          <div className={styles.todoText}>{name}</div>{' '}
          <div className={styles.todoId}>id: {id}</div>
        </span>
      )}
      <span id={id} className={styles.action} onClick={handleClick}>
        {closeTag}
      </span>
      {/*handleClick(item.id)*/}
    </>
  )
}

export default ToDoItem
