import { Input } from '@mui/material'
import {FC, ChangeEvent, KeyboardEvent, useState, useMemo, MouseEvent} from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {getTodos,getNewTodoId} from '../../redux/selectors/todoSelector'
import { addTodo, removeTodo } from '../../redux/reducers/todoReducer'
import styles from './HomePage.module.scss'

const HomePage: FC = () => {
  const { todos } = useAppSelector(getTodos)
    const newId = useAppSelector(getNewTodoId)
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
                    id: newId,
                    name: newTodo,
                })
            )
            setNewTodo('')
        }
    }
  }
  const handleClick = ( event: MouseEvent<HTMLLIElement>) => {
  dispatch(removeTodo(+event.currentTarget.id))
  }
  useMemo(() => {
      console.log(todos)
  },[todos])
  return (
    <div className={'wrapper'}>
      <Input
        value={newTodo}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        placeholder={'Add todo'}
      />
      <div>
        <ul className={styles.todo_container}>
          {todos.map((item) => (
            <li style={{cursor:'pointer'}} id={String(item.id)} onClick={ handleClick} key={item.id}>
              Todo: {item.name} Id: {item.id}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default HomePage
