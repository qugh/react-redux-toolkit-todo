import { FC, MouseEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import getTodos, {getIsSomeTodoMarkedSelector} from '../../redux/selectors/todoSelector'
import styles from './HomePage.module.scss'
import ToDoInput from '../../components/Todo/ToDoInput'
import ToDoItem from '../../components/Todo/ToDoItem'
import { removeAllTodos } from '../../redux/reducers/todoReducer'
import TransparentButton from '../../components/TransparentButton/TransparentButton'
import { clearAllTag } from '../../constants/symbols'
import useAlert from '../../hooks/useAlert'
import { Snackbar } from '@mui/material'
import makeAlert, { actions2 } from '../../utils/makeAlert'
const {REMOVE_ALL_TODOS}= actions2
const HomePage: FC = () => {
  const {todos} = useAppSelector(getTodos)
  const isSomeTodoMarked = useAppSelector(getIsSomeTodoMarkedSelector)
  const dispatch = useAppDispatch()
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(removeAllTodos()) // Todo modal window
    setSnackPack((prev) => [
      ...prev,
      {
        message: makeAlert(REMOVE_ALL_TODOS),
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
    messageInfo
  } = useAlert()
console.log('render')
  return (
    <>
      <ToDoInput setSnackPack={setSnackPack} />
      <ul className={styles.todo_container}>
        {isSomeTodoMarked && (
          <TransparentButton
            onClick={handleClick}
            className={styles.delete_all}
            text={clearAllTag}
          />
        )}
        {todos.map(({ id, todoText, date,isMarked }) => (
          <li key={id}>
            <ToDoItem
              date={date}
              id={id}
              todoText={todoText}
              isMarked={isMarked}
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
