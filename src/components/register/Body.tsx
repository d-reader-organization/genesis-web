'use client'

import React, { Suspense } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { useSearchParams } from 'next/navigation'
import { CreateAccountContent } from './CreateAccount'
import { ConnectWalletContent } from './ConnectWallet'
import { EmailVerificationContent } from './EmailVerification'

enum TabValue {
  createAccount = 'createAccount',
  connectWallet = 'connect-wallet',
  verifyEmail = 'verify-email',
}

const defaultTabs = [
  { label: '01 Create account', value: TabValue.createAccount },
  { label: '02 Connect wallet', value: TabValue.connectWallet },
]

export const RegisterBody: React.FC = () => (
  <Suspense>
    <InnerRegisterBody />
  </Suspense>
)

const InnerRegisterBody: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<string>(TabValue.createAccount)
  const searchParams = useSearchParams()
  const isGoogleSignUp = (searchParams.get('sso') ?? '') === 'google'
  const redirectTo = searchParams.get('redirectTo')
  const tabs = [...defaultTabs, ...(isGoogleSignUp ? [] : [{ label: '03 Verify email', value: TabValue.verifyEmail }])]

  return (
    <Tabs defaultValue={defaultTabs.at(0)?.value} className='w-full' activationMode='manual' value={activeTab}>
      <TabsList className={`grid w-full grid-cols-${tabs.length}`}>
        {tabs.map((tab) => {
          return (
            <TabsTrigger className='cursor-default' key={tab.value} value={tab.value}>
              <span className={activeTab !== tab.value ? 'opacity-20' : ''}>{tab.label}</span>
            </TabsTrigger>
          )
        })}
      </TabsList>

      <TabsContent value={TabValue.createAccount}>
        <CreateAccountContent isGoogleSignUp={isGoogleSignUp} onSuccess={() => setActiveTab(TabValue.connectWallet)} />
      </TabsContent>
      <TabsContent value={TabValue.connectWallet}>
        <ConnectWalletContent isGoogleSignUp={isGoogleSignUp} onSkip={() => setActiveTab(TabValue.verifyEmail)} />
      </TabsContent>
      {tabs.length > 2 ? (
        <TabsContent value={TabValue.verifyEmail}>
          <EmailVerificationContent redirectTo={redirectTo} />
        </TabsContent>
      ) : null}
    </Tabs>
  )
}
