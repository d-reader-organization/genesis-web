import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from 'tailwindconfig'

import { useEffect, useState } from 'react'

// https://observablehq.com/@werehamster/avoiding-hydration-mismatch-when-using-react-hooks
function useMediaQuery(mediaQueryString: string) {
  const [matches, setMatches] = useState<boolean | null>(null)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQueryString)
    const listener = () => setMatches(!!mediaQueryList.matches)
    listener()
    mediaQueryList.addEventListener('change', listener)
    return () => mediaQueryList.removeEventListener('change', listener)
  }, [mediaQueryString])

  return matches
}

type BreakpointHook = () => {
  xs: boolean | null
  sm: boolean | null
  md: boolean | null
  lg: boolean | null
  xl: boolean | null
}

const fullConfig = resolveConfig(tailwindConfig)
const screens = fullConfig.theme.screens

export const useBreakpoints: BreakpointHook = () => {
  const xs = useMediaQuery(`(min-width: ${screens.xs})`)
  const sm = useMediaQuery(`(min-width: ${screens.sm})`)
  const md = useMediaQuery(`(min-width: ${screens.md})`)
  const lg = useMediaQuery(`(min-width: ${screens.lg})`)
  const xl = useMediaQuery(`(min-width: ${screens.xl})`)

  return { xs, sm, md, lg, xl }
}

export const useIsMobile = (): boolean => {
  const { xs, sm, md } = useBreakpoints()

  return !!(xs || sm) && !md
}
