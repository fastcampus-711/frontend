"use client"

import { useRouter } from "next/navigation"

type GreyButtonProps = {
  className?: string
  label: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function GoListButton({
  className,
  label = "",
  ...props
}: GreyButtonProps) {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  return (
    <button
      className={`font-semibold rounded-lg px-6 py-2.5 bg-grey_100 text-grey_800 ${className}`}
      onClick={handleBack}
      {...props}>
      {label}
    </button>
  )
}
