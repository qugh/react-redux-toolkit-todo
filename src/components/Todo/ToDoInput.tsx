import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useState,
  SyntheticEvent,
  useEffect,
} from 'react'
import { addTodo } from '../../redux/reducers/todoReducer'
import { current, nanoid } from '@reduxjs/toolkit'
import { useAppDispatch } from '../../hooks/redux'
import { Input, Snackbar } from '@mui/material'
import { closeTag } from '../../constants/symbols'
import TransparentButton from '../TransparentButton/TransparentButton'
import useAlert from '../../hooks/useAlert'



const ToDoInput: FC = () => {
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
  const [newTodo, setNewTodo] = useState('')

  const showAlert = () => {
    const message=newTodo
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }])
    setNewTodo('')
    setAlertText(`Todo with name '${newTodo}' added successfully`)
    setAlertStatus(true)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value)
  }


  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (newTodo && e.key === 'Enter') {
      dispatch(
        addTodo({
          id: nanoid(16),
          todoText: newTodo,
          date: new Date().toLocaleString(),
        })
      )
      showAlert()
    }
  }
  return (
    <>
      <Input
        value={newTodo}
        sx={{ width: '100%' }}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        placeholder={'Add todo'}
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

export default ToDoInput
