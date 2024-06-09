import localFont from "next/font/local"
import Footer from "@/components/Footer"
import "./globals.css"
import Header from "@/components/Header"
import ReduxProvider from "@/redux/provider"
import { CookiesProvider } from "next-client-cookies/server"

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard"
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable}`}>
      <body className={pretendard.className}>
        <CookiesProvider>
          <ReduxProvider>
            <Header />
            {children}
            <Footer />
          </ReduxProvider>
        </CookiesProvider>
        ;
      </body>
    </html>
  )
}
