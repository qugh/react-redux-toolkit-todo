import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useState,
  SetStateAction,
  Dispatch,
} from 'react'
import { addTodo } from '../../redux/reducers/todoReducer'
import { nanoid } from '@reduxjs/toolkit'
import { useAppDispatch } from '../../hooks/redux'
import { Input } from '@mui/material'
import makeAlert, { actions2 } from '../../utils/makeAlert'
import { SnackbarMessage } from '../../hooks/useAlert'

const { ADD_TODO } = actions2

const ToDoInput: FC<{
  setSnackPack: Dispatch<SetStateAction<readonly SnackbarMessage[]>>
}> = ({ setSnackPack }) => {
  const dispatch = useAppDispatch()
  const [newTodo, setNewTodo] = useState('')
  const showAlert = () => {
    setSnackPack((prev: any) => [
      ...prev,
      {
        message: makeAlert(ADD_TODO, newTodo),
        key: new Date().getTime(),
      },
    ])
    setNewTodo('')
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value)
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (newTodo && e.key === 'Enter') {
      dispatch(addTodo(newTodo))
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
    </>
  )
}

export default ToDoInput
