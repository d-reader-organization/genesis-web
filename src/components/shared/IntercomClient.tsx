'use client'
import { useEffect } from 'react'

export const IntercomClient: React.FC = () => {
  useEffect(() => {
    window.intercomSettings = {
      api_base: `${process.env.NEXT_PUBLIC_INTERCOM_API_BASE}`,
      app_id: `${process.env.NEXT_PUBLIC_INTERCOM_APP_ID}`,
    }
    if (window.Intercom) {
      window.Intercom('reattach_activator')
      window.Intercom('update', window.intercomSettings)
    } else {
      const script = document.createElement('script')
      script.src = `${process.env.NEXT_PUBLIC_INTERCOM_WIDGET_BASE}/${process.env.NEXT_PUBLIC_INTERCOM_APP_ID}`
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return null
}
