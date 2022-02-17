import { useEffect, useState } from 'react'
import TransparentButton from '../components/TransparentButton/TransparentButton'
import { closeTag } from '../constants/symbols'
import { SyntheticEvent } from 'react'
import { Slide, SlideProps } from '@mui/material'

export interface SnackbarMessage {
  message: string
  key: number
}

const useAlert = () => {
  const [alertStatus, setAlertStatus] = useState(false)
  const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([])
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(
    undefined
  )
  const handleCloseAlert = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
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
    setAlertStatus,
    handleExited,
    setSnackPack,
    messageInfo,

  }
}

export default useAlert
