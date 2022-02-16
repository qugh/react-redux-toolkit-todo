import { FC } from 'react'
import styles from './Header.module.scss'
import { NavLink } from 'react-router-dom'

const Header: FC = () => {
  return (
    <div>
      <ul className={styles.ul}>
        <li>
          <NavLink to={'/'}>Home</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Header
