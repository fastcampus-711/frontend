// "use client"

// import { useState, useEffect } from "react"
// import dropdownIcon from "@/public/icon/dropdown_arrow.svg"
// import Image from "next/image"

// type DropDownProps = {
//   className?: string
//   label: string
//   options: Option[]
//   event: (s: any) => void
//   initialValue?: any
// } & React.ButtonHTMLAttributes<HTMLButtonElement>

// type Option = {
//   value: any
//   name: string
// }

// export default function DropDown({
//   label,
//   options,
//   event,
//   initialValue
// }: DropDownProps) {
//   const [open, setOpen] = useState(false)
//   const [selectedType, setSelectedType] = useState<string | null>(
//     initialValue || null
//   )

//   useEffect(() => {
//     if (initialValue) {
//       setSelectedType(initialValue)
//     }
//   }, [initialValue])

//   const dropDownName = selectedType
//     ? options.find(option => option.value === selectedType)?.name
//     : label

//   return (
//     <div className="relative">
//       <div
//         className="w-[200px] h-12 px-4 py-3 rounded-lg border border-neutral-300 justify-between items-center inline-flex cursor-pointer hover:bg-gray-50"
//         onClick={() => {
//           setOpen(!open)
//         }}>
//         <p className="text-gray-900 text-lg font-medium font-['Pretendard'] ">
//           {dropDownName}
//         </p>
//         <Image
//           src={dropdownIcon.src}
//           alt="드랍다운 아이콘"
//           width={24}
//           height={24}
//         />
//       </div>
//       <ul
//         className={`absolute left-0 top-full transform ${open ? "scale-y-100" : "scale-y-0"} transition duration-500 ease-in-out origin-top w-[200px] max-h-64 rounded-lg shadow border border-neutral-300 flex-col justify-center items-center overflow-y-auto divide-y bg-white z-10`}>
//         {options.map((option, index) => (
//           <li
//             key={option.value}
//             onClick={() => {
//               setSelectedType(option.value)
//               event(option.value)
//               setOpen(false)
//             }}
//             className={`self-stretch h-[51px] p-4 flex-col justify-center items-left gap-2 flex ${index === 0 ? "rounded-tl-lg rounded-tr-lg" : index === options.length - 1 ? "rounded-br-lg rounded-bl-lg" : ""} hover:cursor-pointer font-['Pretendard'] text-base ${option.value === selectedType ? "bg-grey_100 text-font_main font-medium" : "bg-white font-normal"}`}>
//             {option.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }
"use client"

import { useState, useEffect } from "react"
import dropdownIcon from "@/public/icon/dropdown_arrow.svg"
import Image from "next/image"

type TxstateDropDownProps = {
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

export default function TxstateDropDown({
  label,
  options,
  event,
  initialValue,
  disabled = false
}: TxstateDropDownProps) {
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
      {selectedType === "SALE" && (
        <div
          className={`w-[90px] bg-[#000D4F] px-2 py-[3px] rounded justify-between items-center inline-flex cursor-pointer`}
          onClick={handleDropDownClick}>
          <p className="text-white">{dropDownName}</p>
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.83205 12.7519C8.43623 13.3457 7.56377 13.3457 7.16795 12.7519L3.03647 6.5547C2.59343 5.89015 3.06982 5 3.86852 5L12.1315 5C12.9302 5 13.4066 5.89015 12.9635 6.5547L8.83205 12.7519Z"
              fill="white"
            />
          </svg>
        </div>
      )}
      {selectedType === "RESERVED" && (
        <div
          className={`w-[90px] px-2 py-[3px] rounded border border-[#000D4F] justify-between items-center inline-flex cursor-pointer `}
          onClick={handleDropDownClick}>
          <p className="text-[#000D4F]">{dropDownName}</p>
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.83205 12.7519C8.43623 13.3457 7.56377 13.3457 7.16795 12.7519L3.03647 6.5547C2.59343 5.89015 3.06982 5 3.86852 5L12.1315 5C12.9302 5 13.4066 5.89015 12.9635 6.5547L8.83205 12.7519Z"
              fill="#000D50"
            />
          </svg>
        </div>
      )}
      {selectedType === "SOLD_OUT" && (
        <div
          className={`w-[90px] px-2 py-[3px] text-grey_300 rounded bg-grey_100 justify-between items-center inline-flex cursor-pointer `}
          onClick={handleDropDownClick}>
          <p className="text-grey_600">{dropDownName}</p>
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.83205 12.7519C8.43623 13.3457 7.56377 13.3457 7.16795 12.7519L3.03647 6.5547C2.59343 5.89015 3.06982 5 3.86852 5L12.1315 5C12.9302 5 13.4066 5.89015 12.9635 6.5547L8.83205 12.7519Z"
              fill="#707070"
            />
          </svg>
        </div>
      )}
      <ul
        className={`absolute left-0 top-full transform ${open ? "scale-y-100" : "scale-y-0"} transition duration-500 ease-in-out origin-top max-h-64 rounded shadow border border-neutral-300 flex-col justify-center items-center overflow-y-auto divide-y bg-white z-10`}>
        {options.map((option, index) => (
          <li
            key={option.value}
            onClick={() => handleOptionClick(option.value)}
            className={`w-[90px] text-sm self-stretch p-2 flex-col justify-center items-left gap-2 flex ${index === 0 ? "rounded-tl-lg rounded-tr-lg" : index === options.length - 1 ? "rounded-br-lg rounded-bl-lg" : ""} ${disabled ? "cursor-not-allowed" : "hover:cursor-pointer"} font-['Pretendard'] text-base ${option.value === selectedType ? "bg-grey_100 text-font_main font-medium" : "bg-white font-normal"}`}>
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
