'use client'
import { useEffect } from 'react'

export const IntercomClient: React.FC = () => {
  useEffect(() => {
    window.intercomSettings = {
      api_base: 'https://api-iam.intercom.io',
      app_id: 'wfqufkpe',
    }

    if (window.Intercom) {
      window.Intercom('reattach_activator')
      window.Intercom('update', window.intercomSettings)
    } else {
      const script = document.createElement('script')
      script.src = 'https://widget.intercom.io/widget/wfqufkpe'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return null
}
