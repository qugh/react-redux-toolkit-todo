import clsx from 'clsx'
import { CSSProperties, FC, MouseEvent } from 'react'
import styles from './TransparentButton.module.scss'

type ButtonProps = {
  id?: string
  text: string
  className?: string
  onClick: (e:MouseEvent<HTMLButtonElement>) => void
  sx?: CSSProperties | undefined
}

const TransparentButton: FC<ButtonProps> = ({
  className,
  text,
  onClick,
  id,
  sx,
}) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className={clsx(styles.button, className)}
      style={sx}
    >
      {text}
    </button>
  )
}

export default TransparentButton
