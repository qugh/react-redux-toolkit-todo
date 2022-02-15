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
    setSnackPack,
  } = useAlert()
  const [newTodo, setNewTodo] = useState('')

  const showAlert = () => {

    setSnackPack((prev) => [...prev, { message: `Todo with name '${newTodo}' added successfully`, key: new Date().getTime() }])
    setNewTodo('')
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
    </>
  )
}

export default ToDoInput
