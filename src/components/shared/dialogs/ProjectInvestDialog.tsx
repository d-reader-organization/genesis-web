'use client'

import React from 'react'
import { useLocalStorage, useToggle } from '@/hooks'
import { LOCAL_STORAGE } from '@/constants/general'
import { PROJECT_INVEST_DIALOG_STEPS } from '@/constants/dialogs'
import { MultiStepDialog } from './MultiStepDialog'

export const ProjectInvestDialog: React.FC = () => {
  const [isDialogRead, setIsDialogRead] = useLocalStorage(LOCAL_STORAGE.IS_PROJECT_INVEST_DISCLAIMER_READ, false)
  const [open, toggleDialog] = useToggle(!isDialogRead)

  const onCompleted = () => {
    toggleDialog()
    setIsDialogRead(true)
  }

  return (
    <MultiStepDialog
      open={open}
      steps={PROJECT_INVEST_DIALOG_STEPS}
      toggleDialog={toggleDialog}
      onCompleted={onCompleted}
    />
  )
}
