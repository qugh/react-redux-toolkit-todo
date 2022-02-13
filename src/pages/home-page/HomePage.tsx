
import {
  FC,
  useMemo,
} from 'react'
import {  useAppSelector } from '../../hooks/redux'
import { getTodos } from '../../redux/selectors/todoSelector'
import styles from './HomePage.module.scss'
import ToDoInput from "../../components/Todo/ToDoInput";
import ToDoItem from "../../components/Todo/ToDoItem";

const HomePage: FC = () => {
  const { todos } = useAppSelector(getTodos)

  useMemo(() => {
    console.log(todos)
  }, [todos])

  return (
    <div className={'wrapper'}>
  <ToDoInput />
      <div>
        <ul className={styles.todo_container}>
          {todos.map((item) => (
        <ToDoItem key={item.id} id={item.id} name={item.name} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default HomePage
