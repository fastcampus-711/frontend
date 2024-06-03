"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function FindPwdContent({page} : {page: string}) {
    const [phoneNumbers, setphoneNumbers] = useState<string[]>(["", "", ""])

    const handlePhoneNumberChange = (index: number, value: string) => {
        const newPhoneNumberParts = [...phoneNumbers]
        newPhoneNumberParts[index] = value
        setphoneNumbers(newPhoneNumberParts)
    }
    const isValidPhoneNumber = (): boolean => {
        const phoneNumber = phoneNumbers.join("-");
        const phonePattern =  /^\d{3}-\d{4}-\d{4}$/
        // return phoneNumbers.every(part => /^\d{3}$/.test(part))
        return phonePattern.test(phoneNumber)
    }

    const buttonClassName = `px-4 py-6 grow shrink basis-0 
                            bg-grey_25 rounded border border-grey_100
                            text-center text-grey_300 text-base font-medium`

    const selectedButtonClassName = `px-4 py-6 grow shrink basis-0 
                                    bg-grey_25 rounded border border-main_color
                                    text-center text-main_color text-base font-medium`

    const router = useRouter()

    const handleFindIdClicked = () => {
        router.push(`/user/find/by-name-and-phone`)
    }
    const handleFindPwdClicked = () => {
        router.push(`/user/find/by-id-and-phone`)
    }
    const handleRequest = () => {
        if(!isValidPhoneNumber()) {
            alert("잘못 입력된 데이터가 있습니다. (임시)")
            return;
        }
        alert("인증번호를 요청합니다. (임시)")
    }

    return (
        <>
            <div className="w-[486px] flex flex-col gap-8">
                <div className="inline-flex justify-between gap-2">
                    <button className={buttonClassName}
                            onClick={handleFindIdClicked}>아이디 찾기</button>
                    <button className={selectedButtonClassName}
                            onClick={handleFindPwdClicked}>비밀번호 찾기</button>
                </div>
                <div className="flex flex-col gap-8">
                    <div className="inline-flex items-center">
                        <p className="w-[120px] text-grey_500 text-base font-normal">아이디</p>
                        <input required={true} className="grow shrink px-4 h-10 bg-grey_25 rounded-lg border border-grey_100"></input>
                    </div>
                    <div className="inline-flex items-center">
                        <p className="w-[120px] text-grey_500 text-base font-normal">이름</p>
                        <input required={true} className="grow shrink px-4 h-10 bg-grey_25 rounded-lg border border-grey_100"></input>
                    </div>
                    <div className="inline-flex items-center">
                        <p className="w-[120px] text-grey_500 text-base font-normal">휴대폰 번호</p>
                        <div className="inline-flex grow shrink justify-between h-10 gap-4">
                            {phoneNumbers.map((part, index) => [
                                <input required key={index} maxLength={4} value={part} className="w-[87px] px-4 bg-grey_25 rounded-lg border border-grey_100"
                                       onChange={e => handlePhoneNumberChange(index, e.target.value)} />,
                                index < 2 && <p key={`hyphen_${index}`} className="text-grey_250 text-base font-normal py-2">-</p >
                            ])}
                        </div>
                    </div>
                </div>
                <button className="py-6 bg-main_color rounded
                                text-center text-white text-lg font-semibold"
                        onClick={handleRequest}>
                    인증번호 요청
                </button>
            </div>
        </>
    )
}