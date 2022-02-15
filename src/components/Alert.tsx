import { Snackbar } from '@mui/material'
import useAlert from '../hooks/useAlert'
import { useEffect, useState } from 'react'

const Alert = () => {
  const [rerender, setRerender] = useState(false);




  const {
    alertStatus,
    handleExited,
    action,
    messageInfo,
    handleCloseAlert
  } = useAlert()
  useEffect(()=>{
    setRerender(!rerender);     //whenever you want to re-render
  },[alertStatus])
  return (      <Snackbar
    key={ messageInfo?.key}
    open={alertStatus}
    autoHideDuration={4000}
    onClose={handleCloseAlert}
    message={ messageInfo?.message}
    action={action}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    TransitionProps={{ onExited: handleExited }}
  />)
}

export default Alert