import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Love Story | Kuna & Maximilian Wedding',
  description: 'The beautiful journey of Kuna and Maximilian - from first glances to forever.',
}

export default function LoveStoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
