import { FC, MouseEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import getTodos from '../../redux/selectors/todoSelector'
import styles from './HomePage.module.scss'
import ToDoInput from '../../components/Todo/ToDoInput'
import ToDoItem from '../../components/Todo/ToDoItem'
import { removeAllTodos } from '../../redux/reducers/todoReducer'
import TransparentButton from '../../components/TransparentButton/TransparentButton'
import { clearAllTag } from '../../constants/symbols'
import useAlert from '../../hooks/useAlert'
import { Snackbar } from '@mui/material'
import makeAlert from '../../utils/makeAlert'

const HomePage: FC = () => {
  const { oldTodos, todos } = useAppSelector(getTodos)
  const dispatch = useAppDispatch()
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(removeAllTodos()) // Todo modal window
    setSnackPack((prev) => [
      ...prev,
      {
        message: makeAlert('removeAllTodos'),
        key: new Date().getTime(),
      },
    ])
  }
  const {
    alertStatus,
    handleExited,
    setSnackPack,
    action,
    handleCloseAlert,
    messageInfo,
  } = useAlert()

  return (
    <>
      <ToDoInput setSnackPack={setSnackPack} />
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
            <ToDoItem
              date={date}
              id={id}
              todoText={todoText}
              isOld={false}
              setSnackPack={setSnackPack}
            />
          </li>
        ))}
        {oldTodos.map(({ id, todoText, date }) => (
          <li key={id}>
            <ToDoItem
              date={date}
              id={id}
              todoText={todoText}
              isOld={true}
              setSnackPack={setSnackPack}
            />
          </li>
        ))}
      </ul>

      <Snackbar
        key={messageInfo?.key}
        open={alertStatus}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
        message={messageInfo?.message}
        action={action}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        TransitionProps={{ onExited: handleExited }}
      />
    </>
  )
}

export default HomePage
