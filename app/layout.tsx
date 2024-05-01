import Link from "next/link"

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>
        <Link href="/">Home</Link>
        <Link href="/test">Test</Link>
        <Link href="/board">Board</Link>
        {children}
      </body>
    </html>
  )
}
