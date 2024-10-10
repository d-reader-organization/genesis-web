import { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'

export const metadata: Metadata = {
  title: 'dReader - Privacy Policy',
  description: '🔏 dReader Privacy Policy and Terms of Service',
}

export default async function RemoteMdxPage() {
  const res = await fetch('https://raw.githubusercontent.com/d-reader-organization/.github/main/PRIVACY_POLICY.md')
  const markdown = await res.text()
  return <MDXRemote source={markdown} />
}
