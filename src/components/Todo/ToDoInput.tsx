import {ChangeEvent, FC, KeyboardEvent, useState} from 'react'
import {addTodo} from "../../redux/reducers/todoReducer";
import {nanoid} from "@reduxjs/toolkit";
import {useAppDispatch} from "../../hooks/redux";
import { Input } from '@mui/material'

const ToDoInput:FC = () => {
    const dispatch = useAppDispatch()
    const [newTodo, setNewTodo] = useState('')
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTodo(e.target.value)
    }
    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (newTodo) {
                dispatch(
                    addTodo({
                        id: nanoid(16),
                        name: newTodo,
                    })
                )
                setNewTodo('')
            }
        }
    }
    return(
        <Input
            value={newTodo}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            placeholder={'Add todo'}
        />
    )
}

export default ToDoInput