import {
  FC,
  MouseEvent,
  useState,
  ChangeEvent,
  KeyboardEvent,
  FocusEvent,
} from 'react'
import { ITodo } from '../../types/Todo'
import {
  changeTodo,
  removeTodo,
} from '../../redux/reducers/todoReducer'
import { useAppDispatch } from '../../hooks/redux'

const ToDoItem: FC<ITodo> = ({ id, name }) => {
  const [editMode, setEditMode] = useState(false)
  const [todoValue, setTodoValue] = useState(name)
  const dispatch = useAppDispatch()
  const handleClick = (event: MouseEvent<HTMLLIElement>) => {
    dispatch(removeTodo(event.currentTarget.id))
  }
  const closeTag: string = '\u2716'

  const openEditMode = (e: MouseEvent<HTMLSpanElement>) => {
    setEditMode(true)
  }
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoValue(event.currentTarget.value)
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Escape') setEditMode(false)
    if (e.code === 'Enter') {
      if (todoValue) {
        dispatch(
            changeTodo({
              id,
              name: todoValue,
            })
        )
        setEditMode(false)
      }
    }
  }
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setEditMode(false)
  }
  return (
    <li key={id} id={id}>
      {editMode ? (
        <input
          value={todoValue}
          id={id}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          autoFocus={true}
        />
      ) : (
        <span onClick={openEditMode}>
          Todo: {name} Id: {id}
        </span>
      )}
      <span id={id} onClick={handleClick}>
        {closeTag}
      </span>
      {/*handleClick(item.id)*/}
      {/*перенести в компоненту и сделать useState edit mode */}
    </li>
  )
}

export default ToDoItem
