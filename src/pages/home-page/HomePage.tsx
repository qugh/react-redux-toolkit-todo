import { FC, useMemo,MouseEvent } from 'react'
import {useAppDispatch, useAppSelector} from '../../hooks/redux'
import getTodos from '../../redux/selectors/todoSelector'
import styles from './HomePage.module.scss'
import ToDoInput from '../../components/Todo/ToDoInput'
import ToDoItem from '../../components/Todo/ToDoItem'
import {removeAllTodos} from "../../redux/reducers/todoReducer";

const HomePage: FC = () => {
  const { oldTodos, todos } = useAppSelector(getTodos)
  const dispatch = useAppDispatch()
  const handleClick = (e:MouseEvent<HTMLButtonElement>) => {
    dispatch(removeAllTodos())         // Todo modal window
  }
  useMemo(() => {
    console.log(todos)
  }, [todos])
  const clearAllTag: string = '\u2298'
  return (
    <div className={'wrapper'}>
      <ToDoInput />
          <div style={{minWidth:'100px'}}>
        <ul className={styles.todo_container}>

          {(!!todos.length || !!oldTodos.length) && <button onDoubleClick={handleClick} className={styles.delete_all}>{clearAllTag}</button>}
          {todos.map((item) => (
            <li key={item.id}>
              <ToDoItem
                id={item.id}
                name={item.name}
                isOld={false}
              />
            </li>
          ))}
          {oldTodos.map((item) => (
            <li key={item.id}>
              <ToDoItem
                key={item.id}
                id={item.id}
                name={item.name}
                isOld={true}
              />
            </li>
          ))}
        </ul>
          </div>
    </div>
  )
}

export default HomePage
