"use client"

import agree_checkbox_icon from "@/public/icon/agree_false.svg"
import agree_checked_icon from "@/public/icon/agree_true.svg"

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthContent() {
    const regularPhone = [["SKT", "KT", "LG U+"], ["SKT 알뜰폰", "KT 알뜰폰", "LG U+ 알뜰폰"]]

    const [male, isMale] = useState(false)
    const [female, isFemale] = useState(false)
    const [btnClicked, setBtnClicked] = useState(0)

    const router = useRouter();

    const handleNextButton = () => {
        router.push(`/user/join/signUp`)
    }

    return (
        <>
        <div className="max-w-[486px] flex flex-col gap-8">
            <div className="inline-flex justify-between items-center">
                <p className="w-[120px] h-10 text-grey_800 text-[22px]">본인인증</p>
                <p className="h-5 text-right text-grey_250 text-sm border-b border-grey_250">본인인증없이 회원가입</p>
            </div>
            <div className="inline-flex items-center">
                <p className="w-[120px] h-8 text-grey_500">이름</p>
                <input className="grow shrink h-10 px-4 bg-grey_25 rounded-[7px] border border-grey_100"/>
            </div>
            <div className="inline-flex items-center">
                <p className="w-[120px] h-8 text-grey_500">주민번호</p>
                <span className="inline-flex gap-4">
                    <input required maxLength={6} minLength={6} className="w-[120px] h-10 px-4 bg-grey_25 rounded-[7px] border border-grey_100"/>
                    <p className="text-grey_250 text-base font-normal py-2">-</p>
                    <input required maxLength={1} minLength={1} className="w-[29px] h-10 px-4 bg-grey_25 rounded-[7px] border border-grey_100"/>
                    <p className="text-grey_250 text-base font-normal py-2">* * * * * *</p>
                </span>
  
            </div>
            <div className="inline-flex items-center ">
                <p className="w-[120px] h-8 text-grey_500">성별</p>
                <div className="inline-flex h-5 items-center gap-6">
                    <input id="male" type="checkbox" className={`hidden`}
                            checked={male} onChange={() => {isMale(!male); isFemale(male)}}/>
                    <label htmlFor="male" className={`w-full justify-center items-center gap-2 inline-flex hover:cursor-pointer`}>
                        <img src={male == false ? agree_checkbox_icon.src : agree_checked_icon.src} />               
                        <p>남자</p>
                    </label>   
                    <input id="female" type="checkbox" className={`hidden`}
                            checked={female} onChange={() => {isFemale(!female); isMale(female)}}/>
                    <label htmlFor="female" className={`w-full justify-center items-center gap-2 inline-flex hover:cursor-pointer`}>
                        <img src={female == false ? agree_checkbox_icon.src : agree_checked_icon.src} />               
                        <p>여자</p>
                    </label>  
                </div>
            </div>
            <div className="inline-flex items-center">
                <p className="w-[120px] h-8 text-grey_500">통신사 선택</p>
                <div className="flex flex-col gap-2 text-sm">
                    <span className="inline-flex gap-2">
                        {regularPhone[0].map((item, index) => (
                            <button key={`btn_${index}`} className={`px-4 py-2.5 rounded-lg border border-grey_100 ${btnClicked === index ? "bg-main_color text-grey_50" : "bg-grey_25"}`}
                                    onClick={() => setBtnClicked(index)}>{item}</button>
                        ))}
                    </span>
                    <span className="inline-flex gap-2">
                        {regularPhone[1].map((item, index) => (
                            <button key={`btn_${index+3}`} className={`px-4 py-2.5 rounded-lg border border-grey_100 ${btnClicked === index + 3? "bg-main_color text-grey_50" : "bg-grey_25"}`}
                                    onClick={() => setBtnClicked(index + 3)}>{item}</button>
                        ))}
                    </span>
                </div>
                
            </div>
            <div className="inline-flex items-center">
                <p className="w-[120px] h-8 text-grey_500">휴대폰 번호</p>
                <div className="inline-flex gap-2">
                    <input className="grow shrink h-10 px-4 bg-grey_25 rounded-[7px] border border-grey_100"
                           placeholder="-없이 입력"/>
                    <button className="h-10 px-4 bg-grey_500 rounded-lg
                                       text-grey_50 text-sm whitespace-nowrap">인증번호 요청</button>
                </div>
                
            </div>
            <button className="w-full px-[200px] py-6 bg-main_color rounded 
                            text-center text-white text-lg font-semibold"
                    onClick={handleNextButton}>다음</button>
        </div>
        </>
        
    )
}