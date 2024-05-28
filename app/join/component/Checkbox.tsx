"use client"

import { useState } from "react"

import agree_checkbox_icon from "@/public/icon/agree_checkbox.svg"
import checked_icon from "@/public/icon/agree_checked_checkbox.svg"
import checkbox_icon from "@/public/icon/autologin_checkbox.svg"


type CheckboxProps = {
    use: string,
    label: string,
}

export default function Checkbox({use, label} : CheckboxProps) {
    const [checked, isChecked] = useState(false);
    const agree = "text-zinc-900 text-base font-medium font-['Pretendard']";
    const check = "text-zinc-600 text-base font-normal font-['Pretendard']";

    return (
        <div className="w-full justify-center items-center gap-2 inline-flex hover:cursor-pointer"
            onClick={() => isChecked(!checked)}>
            <img src={checked == false ? checkbox_icon.src : checked_icon.src} />
            <label className={`hover:cursor-pointer ${use == "agree" ? {agree} : (use == "check" ? {check} : null)}`}>{label}</label>
        </div>
    )
}