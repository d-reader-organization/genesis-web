import { useState } from 'react'

type ToggleHook = (initialState?: boolean) => [boolean, VoidFunction, VoidFunction, VoidFunction]

export const useToggle: ToggleHook = (initialState = false) => {
  const [state, setState] = useState<boolean>(initialState)
  const toggleState = () => setState((prevState) => !prevState)
  const falsifyState = () => setState(false)
  const truthifyState = () => setState(true)

  return [state, toggleState, falsifyState, truthifyState]
}

export default useToggle
