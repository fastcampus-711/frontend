"use client"

import { useState, useEffect } from "react"
import dropdownIcon from "@/public/icon/dropdown_arrow.svg"
import Image from "next/image"

type DropDownProps = {
  className?: string
  label: string
  options: Option[]
  event: (s: string) => void
  initialValue?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

type Option = {
  value: any
  name: string
}

export default function DropDown({
  label,
  options,
  event,
  initialValue
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

  return (
    <div className="relative">
      <div
        className="w-[200px] h-12 px-4 py-3 rounded-lg border border-neutral-300 justify-between items-center inline-flex cursor-pointer hover:bg-gray-50"
        onClick={() => {
          setOpen(!open)
        }}>
        <p className="text-gray-900 text-lg font-medium font-['Pretendard'] ">
          {dropDownName}
        </p>
        <Image
          src={dropdownIcon.src}
          alt="드랍다운 아이콘"
          width={24}
          height={24}
        />
      </div>
      <ul
        className={`absolute left-0 top-full transform ${open ? "scale-y-100" : "scale-y-0"} transition duration-500 ease-in-out origin-top w-[200px] max-h-64 rounded-lg shadow border border-neutral-300 flex-col justify-center items-center overflow-y-auto divide-y bg-white z-10`}>
        {options.map((option, index) => (
          <li
            key={option.value}
            onClick={() => {
              setSelectedType(option.value)
              event(option.value)
              setOpen(false)
            }}
            className={`self-stretch h-[51px] p-4 flex-col justify-center items-left gap-2 flex ${index === 0 ? "rounded-tl-lg rounded-tr-lg" : index === options.length - 1 ? "rounded-br-lg rounded-bl-lg" : ""} hover:cursor-pointer font-['Pretendard'] text-base ${option.value === selectedType ? "bg-grey_100 text-font_main font-medium" : "bg-white font-normal"}`}>
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
