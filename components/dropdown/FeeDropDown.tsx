"use client"

import { useState, useEffect } from "react"
import dropdownIcon from "@/public/icon/dropdown_arrow.svg"
import Image from "next/image"

type DropDownProps = {
  className?: string
  label: string
  options: Option[]
  event: (s: any) => void
  initialValue?: any
  disabled?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

type Option = {
  value: any
  name: string
}

export default function FeeDropDown({
  label,
  options,
  event,
  initialValue,
  disabled = false
}: DropDownProps) {
  const [open, setOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<string | null>(
    initialValue || null
  )

  useEffect(() => {
    if (initialValue) {
      setSelectedType(initialValue)
    }
  }, [initialValue])

  const dropDownName = selectedType
    ? options.find(option => option.value === selectedType)?.name
    : label

  const handleDropDownClick = () => {
    if (!disabled) {
      setOpen(!open)
    }
  }

  const handleOptionClick = (value: any) => {
    if (!disabled) {
      setSelectedType(value)
      event(value)
      setOpen(false)
    }
  }

  return (
    <div className="relative">
      <div
        className={`inline-flex w-30 h-6 px-4 py-3 rounded-lg items-center gap-1 cursor-pointer ${disabled ? "bg-gray-200 cursor-not-allowed" : ""}`}
        onClick={handleDropDownClick}>
        <p
          className={`text-base font-normal ${disabled ? "text-gray-500" : "text-grey_400"}`}>
          {dropDownName}
        </p>
        <Image
          src={dropdownIcon.src}
          alt="드랍다운 아이콘"
          width={16}
          height={16}
        />
      </div>
      <ul
        className={`absolute left-0 top-full transform ${open ? "scale-y-100" : "scale-y-0"} transition duration-500 ease-in-out origin-top w-[200px] max-h-64 rounded-lg shadow border border-neutral-300 flex-col justify-center items-center overflow-y-auto divide-y bg-white z-10`}>
        {options.map((option, index) => (
          <li
            key={option.value}
            onClick={() => handleOptionClick(option.value)}
            className={`self-stretch h-[51px] p-4 flex-col justify-center items-left gap-2 flex ${index === 0 ? "rounded-tl-lg rounded-tr-lg" : index === options.length - 1 ? "rounded-br-lg rounded-bl-lg" : ""} ${disabled ? "cursor-not-allowed" : "hover:cursor-pointer"} text-base ${option.value === selectedType ? "bg-grey_100 text-main_color font-medium" : "bg-white font-normal"}`}>
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
