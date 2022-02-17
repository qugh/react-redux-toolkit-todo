import { Snackbar } from '@mui/material'
import useAlert from '../hooks/useAlert'

const Alert = () => {
  const {
    alertStatus,
    handleExited,
    action,
    messageInfo,
    handleCloseAlert
  } = useAlert()
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