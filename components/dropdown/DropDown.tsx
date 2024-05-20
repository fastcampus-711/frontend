'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import dropdownIcon from "@/public/icon/dropdown_arrow.svg"

type DropDownProps = {
    className?: string
    label:string
    // options: Option[]
    event: (s: string) => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

type Option = {
    value: string;
    name: string;
}

export default function DropDown({label, value, event} : DropDownProps) {
    const [open, setOpen]  = useState(false);
    const [dropDownName, setDropDownName] = useState(label);
    const [selectedType, setSelectedType] = useState(value);

    const typeOption: {value: string; name: string}[] = [
        {value: "allcategory", name: "전체"}, 
        {value: "used", name: "중고거래"}, 
        {value: "share", name: "무료나눔"}
    ];
    const stateOption: {value: string; name: string}[] = [
        {value: "allstatus", name: "전체"}, 
        {value: "sold", name: "판매완료"}, 
        {value: "reserved", name: "예약중"},
        {value: "onsale", name: "판매중"}
    ];

    const options = (label == "거래방식") ? typeOption : stateOption;
    return (
        <div>
            <div className="w-[200px] h-12 px-4 py-3 rounded-lg border border-neutral-300 justify-between items-center inline-flex cursor-pointer hover:bg-gray-50"
                onClick={() => {
                    setOpen(!open)
                }}>
                <p className="text-gray-900 text-lg font-medium font-['Pretendard'] ">{dropDownName}</p>
                <img src={dropdownIcon.src} className="w-6 h-6 flex-col justify-center items-center gap-2.5 inline-flex" />
            </div>
            <ul onClick={() => { setOpen(!open) }}>
                <li className={`transform ${ open ? `scale-y-100` : `scale-y-0` } 
                                transition duration-500 ease-in-out origin-top 
                                w-[200px] h-${options.length * 51}
                                rounded-lg shadow border
                                border-neutral-300
                                flex-col justify-center items-center inline-flex
                                divide-y`}>
                    {options.map((option) => (
                        <div key={option.value} 
                             onClick={() => {setSelectedType(option.value); setDropDownName(option.name); event(option.value);}}
                             className={`self-stretch 
                                        h-[51px] p-4 
                                        flex-col justify-center items-left gap-2 flex 
                                        ${options.indexOf(option) == 0 ? "rounded-tl-lg rounded-tr-lg" : (options.indexOf(option) == (options.length - 1) ? "rounded-br-lg rounded-bl-lg" : "")}
                                        hover:cursor-pointer
                                        font-['Pretendard'] 
                                        text-base ${option.value == selectedType ? "bg-grey_100 text-font_main font-medium" 
                                        : "bg-white font-normal"}`}>
                            {option.name}
                        </div>
                    ))}
                </li>
            </ul>
        </div>
    )
}
