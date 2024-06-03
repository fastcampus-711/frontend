"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

type User = {
    name: string
    phone: string
    id: string
}

export default function FindIdContent({page} : {page: string}) {
    const [name, setName] = useState("")
    const [phoneNumbers, setphoneNumbers] = useState<string[]>(["", "", ""])
    const [foundId, setFoundId] = useState<string | null>(null)

    const [message, setMessage] = useState("")

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

    const handleSearch = async () => {
        const phoneNumber = phoneNumbers.join("-");

        if(!isValidPhoneNumber()) {
            alert("오류")
            return;
        }

        // const response = await fetch(`http://localhost:3001/findId?name=${name}&phone=${phoneNumber}`)
        // const userData: User[] = await response.json()

        // if(userData){
        //     setFoundId(userData[0].id)      
        //     setMessage(`'${name}' 님의 아이디는 '${foundId}'입니다.`)
        // }
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

    return (
        <>
            <div className="w-[486px] flex flex-col gap-8">
                <div className="inline-flex justify-between gap-2">
                    <button className={selectedButtonClassName}
                            onClick={handleFindIdClicked}>아이디 찾기</button>
                    <button className={buttonClassName}
                            onClick={handleFindPwdClicked}>비밀번호 찾기</button>
                </div>
                <div className="flex flex-col gap-8">
                    <div className="inline-flex items-center">
                        <p className="w-[120px] text-grey_500 text-base font-normal">이름</p>
                        <input required={true} className="grow shrink basis-0 px-4 h-10 bg-grey_25 rounded-lg border border-grey_100"
                               value={name} onChange={e => setName(e.target.value)}></input>
                    </div>
                    <div className="inline-flex items-center">
                        <p className="w-[120px] text-grey_500 text-base font-normal">휴대폰 번호</p>
                        <div className="inline-flex grow shrink basis-0 h-10 justify-between gap-4">
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
                        onClick={handleSearch}>
                    아이디 조회
                </button>
                <p>{message}</p>
            </div>
        </>
    )
}