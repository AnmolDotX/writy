import { Bricolage_Grotesque } from 'next/font/google'
import { Space_Mono } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'
import { Toaster } from 'sonner'

const fontHeading = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = Space_Mono({
  subsets: ['latin'],
  weight : ['400', '700'],
  display: 'swap',
  variable: '--font-body',
})

export default function Layout({ children } : {children : React.ReactNode}) {
  return (
    <html lang="en">
      <Toaster position='top-center' />
      <body 
        className={cn(
          'antialiased',
          fontHeading.variable,
          fontBody.variable,
        )}
      >
        {children}
      </body>
    </html>
  )
}