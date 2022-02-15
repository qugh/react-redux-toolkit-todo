import { SyntheticEvent, useEffect, useState } from 'react'
import TransparentButton from '../components/TransparentButton/TransparentButton'
import { closeTag } from '../constants/symbols'
export interface SnackbarMessage {
  message: string
  key: number
}
const useAlert = () => {
  const [alertStatus, setAlertStatus] = useState(false)
  const [alertText, setAlertText] = useState<undefined | string>('')
  const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([])
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(
    undefined
  )
  const handleCloseAlert = (event: Event | SyntheticEvent) => {
    setAlertStatus(false)
  }

  const action = (
    <TransparentButton
      text={closeTag}
      sx={{ color: 'white' }}
      onClick={handleCloseAlert}
    />
  )
  useEffect(() => {

    if (snackPack.length && !messageInfo) {

      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] })

      setSnackPack((prev) => prev.slice(1))

      setAlertStatus(true)
    } else if (snackPack.length && messageInfo && alertStatus) {
      // Close an active snack when a new one is added
      setAlertStatus(false)
    }
  }, [snackPack, messageInfo, alertStatus])

  const handleExited = () => {
    setMessageInfo(undefined)
  }

  return {
    handleCloseAlert,
    action,
    alertStatus,
    alertText,
    setAlertStatus,
    setAlertText,
    handleExited,
    setSnackPack,
  }
}

export default useAlert
