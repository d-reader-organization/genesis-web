import { useCallback, useState } from 'react'

export type StepsHook<T> = {
  activeStep: T
  back: () => void
  next: () => void
  reset: () => void
  numberOfSteps: number
  isLastStep: boolean
}

export const useSteps = <T>(steps: T[]): StepsHook<T> => {
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const numberOfSteps = steps.length
  const isLastStep = numberOfSteps === activeStepIndex + 1
  const firstIndex = 0
  const lastIndex = numberOfSteps - 1

  const back = useCallback(() => {
    setActiveStepIndex((prevIndex) => (prevIndex <= firstIndex ? firstIndex : prevIndex - 1))
  }, [])

  const next = useCallback(() => {
    setActiveStepIndex((prevIndex) => (prevIndex >= lastIndex ? lastIndex : prevIndex + 1))
  }, [])

  const reset = useCallback(() => {
    setActiveStepIndex(0)
  }, [])

  const activeStep = steps[activeStepIndex]

  return { activeStep, back, next, reset, numberOfSteps, isLastStep }
}

export default useSteps
