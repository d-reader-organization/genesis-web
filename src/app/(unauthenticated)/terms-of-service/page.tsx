import { PrivacyPolicyContent } from '@/components/privacy-policy/markdown-content'
import { Metadata } from 'next'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'dReader - Terms of Service',
  description: '🔏 dReader Terms of Service',
}

export default async function TermsOfService() {
  return (
    <div className='container mx-auto py-8 max-w-screen-md'>
      <PrivacyPolicyContent />
    </div>
  )
}
