import clsx from 'clsx'
import { FC, MouseEvent } from 'react'
import styles from './TransparentButton.module.scss'

type ButtonProps = {
  id?: string
  text: string
  className: string
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

const TransparentButton: FC<ButtonProps> = ({
  className,
  text,
  onClick,
  id,
}) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className={clsx(styles.button, className)}
    >
      {text}
    </button>
  )
}

export default TransparentButton
