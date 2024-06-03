"use client"
import { useRouter } from "next/navigation";

export default function InputUserInfoContent() {
    const router = useRouter();

    const handleNextButton = () => {
        alert("회원 가입 완료")
    }
    
    return (
        <div className="flex flex-col gap-[50px]">
            <div className="max-w-[486px] flex flex-col gap-8">
                <div className="inline-flex items-center">
                    <p className="w-[120px] text-grey_500 py-1">이름</p>
                    <p className="font-semibold">김패캠</p>
                </div>
                <div className="inline-flex items-center">
                    <p className="w-[120px] text-grey_500  py-1">휴대폰 번호</p>
                    <p className="font-semibold">010-1234-1234</p>
                </div>
                <div className="inline-flex items-center">
                    <p className="w-[120px] text-grey_500">아이디</p>
                    <div className="flex flex-col grow shrink">
                        <input className="h-10 px-4 bg-grey_25 rounded-[7px] border border-grey_100"/>
                        <label className="text-grey_250 text-sm font-normal">6글자 이상의 영문, 숫자,_만 입력할 수 있습니다.</label>
                    </div>
                </div>
                <div className="inline-flex items-center">
                    <p className="w-[120px] text-grey_500">비밀번호</p>
                    <input className="grow shrink h-10 px-4 bg-grey_25 rounded-[7px] border border-grey_100"/>
                </div>
                <div className="inline-flex items-center">
                    <p className="w-[120px] text-grey_500">비밀번호 확인</p>
                    <div className="flex flex-col">
                        <input className="grow shrink h-10 px-4 bg-grey_25 rounded-[7px] border border-grey_100"/>
                        <label className="text-grey_250 text-sm font-normal">확인란에 입력할 비밀번호는 상단 내용과 동일해야 합니다.</label>
                    </div>
                </div>
            </div>
            <button className="w-full px-[200px] py-6 bg-main_color rounded 
                        text-center text-white text-lg font-semibold"
                onClick={handleNextButton}>다음</button>
        </div>
    )
}