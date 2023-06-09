import './globals.css'
import { Rubik } from 'next/font/google'

const rubik = Rubik({ weights: [400, 500, 700],subsets: ['latin-ext'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  

}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        
      </head>
      <body className={rubik.className}>{children}</body>
    </html>
  )
}
