import Footer from "@/components/Footer"
import "./globals.css"
import Header from "@/components/Header"
import ReduxProvider from "@/redux/provider"

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>
        <ReduxProvider>
          <Header />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  )
}
