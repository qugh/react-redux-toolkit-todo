import { ChangeEvent, FC, KeyboardEvent, useState } from 'react'
import { addTodo } from '../../redux/reducers/todoReducer'
import { nanoid } from '@reduxjs/toolkit'
import { useAppDispatch } from '../../hooks/redux'
import { Input} from '@mui/material'
import makeAlert from '../../utils/makeAlert'

const ToDoInput: FC<{ setSnackPack: any }> = ({ setSnackPack }) => {
  const dispatch = useAppDispatch()
  const [newTodo, setNewTodo] = useState('')

  const showAlert = () => {
    setSnackPack((prev: any) => [
      ...prev,
      { message: makeAlert('addTodo', newTodo), key: new Date().getTime() },
    ])
    setNewTodo('')
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value)
  }

  const handleKeyPress = (
    e: KeyboardEvent<HTMLInputElement>,
    date = new Date().toLocaleString()
  ) => {
    if (newTodo && e.key === 'Enter') {
      dispatch(
        addTodo({
          id: nanoid(16),
          todoText: newTodo,
          date,
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
