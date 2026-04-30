import './globals.css'
import ApolloWrapper from './components/shared/ApolloWrapper'
import Navbar from './components/shared/Navbar'
import PageTransition from './components/shared/PageTransition'

export const metadata = {
  title: 'SenseiSearch — Search, Decoded',
  description: 'Live benchmark: MongoDB $regex vs Atlas Search. Side by side. Down to the millisecond.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ApolloWrapper>
          <Navbar />
          <PageTransition>{children}</PageTransition>
        </ApolloWrapper>
      </body>
    </html>
  )
}
