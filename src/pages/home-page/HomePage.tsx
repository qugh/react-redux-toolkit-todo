import { FC, MouseEvent, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import getTodos from '../../redux/selectors/todoSelector'
import styles from './HomePage.module.scss'
import ToDoInput from '../../components/Todo/ToDoInput'
import ToDoItem from '../../components/Todo/ToDoItem'
import { removeAllTodos } from '../../redux/reducers/todoReducer'
import TransparentButton from '../../components/TransparentButton/TransparentButton'
import { clearAllTag } from '../../constants/symbols'
import { Snackbar } from '@mui/material'
import useAlert from '../../hooks/useAlert'

const HomePage: FC = () => {
  const { oldTodos, todos } = useAppSelector(getTodos)
  const dispatch = useAppDispatch()
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(removeAllTodos()) // Todo modal window
  }
  const {
    handleCloseAlert,
    action,
    alertStatus,
    alertText,
    handleExited,
  } = useAlert()
  useEffect(() => {
    console.log(alertStatus)
  },[alertStatus])
  return (
    <div className={'wrapper'}>
      <ToDoInput />

      <ul className={styles.todo_container}>
        {!!oldTodos.length && (
          <TransparentButton
            onClick={handleClick}
            className={styles.delete_all}
            text={clearAllTag}
          />
        )}
        {todos.map(({ id, todoText, date }) => (
          <li key={id}>
            <ToDoItem date={date} id={id} todoText={todoText} isOld={false} />
          </li>
        ))}
        {oldTodos.map(({ id, todoText, date }) => (
          <li key={id}>
            <ToDoItem date={date} id={id} todoText={todoText} isOld={true} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HomePage
