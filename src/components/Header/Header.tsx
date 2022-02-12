import { FC } from 'react'
import styles from './Header.module.scss'
import { NavLink } from 'react-router-dom'

const Header: FC = () => {
  console.log(styles)
  return (
    <div>
      <div className={'wrapper'}>
        <ul className={styles.ul}>
          <li>
            <NavLink to={'/home'}>Home</NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header
