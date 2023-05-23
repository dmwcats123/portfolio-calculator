import './globals.css'

export const metadata = {
  title: 'portfolio-calculator',
  description: 'A calculator for your portfolio based on historical data',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
