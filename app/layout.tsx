import localFont from "next/font/local"
import Footer from "@/components/Footer"
import "./globals.css"
import Header from "@/components/Header"
import ReduxProvider from "@/redux/provider"
import Head from "./head"

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
      <Head />
      <body className={pretendard.className}>
        <ReduxProvider>
          <Header />
          {children}
          <Footer />
        </ReduxProvider>
        ;
      </body>
    </html>
  )
}
