import Link from "next/link"

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="mo">
      <body>
        <Link href="/">Home</Link>
        <Link href="/test">Test</Link>
        {children}
      </body>
    </html>
  )
}
