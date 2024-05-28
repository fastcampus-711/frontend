"use client"

import agree_checkbox_icon from "@/public/icon/agree_checkbox.svg"
import agree_checked_icon from "@/public/icon/agree_checked_checkbox.svg"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TermsPage() {
    const [service, setServiceChecked] = useState(false);
    const [personal, setPersonalChecked] = useState(false);
    const [marketing, setMarketingChecked] = useState(false);
    const [all, setAllChecked] = useState(false);

    const checkBoxClassName = "w-full justify-start items-center gap-2 inline-flex hover:cursor-pointer";
    const checkBoxLabelClassName = "hover:cursor-pointer text-zinc-900 text-base font-medium font-['Pretendard']";

    const router = useRouter();

    const onClickNextButton = () => {
        router.push("/join/auth")
    }
    
    return (
        <div> 
            <div className="flex flex-col justify-center items-center">
                <div className="pb-10"></div>
                <div className="flex flex-col justify-center items-center">
                    <div className="w-[486px] h-[146px] pl-4 pr-1 py-2 bg-stone-50 rounded-lg border border-gray-200 justify-start items-end gap-2 inline-flex">
                        <div className="w-[440px] h-[124px]">
                            <span className="text-black text-sm font-normal font-['Pretendard']">서비스 이용약관 동의 1</span>
                        </div>
                    </div>
                    <div className="pt-4"></div>
                    <div className={checkBoxClassName}
                        onClick={() => setServiceChecked(!service)}>
                        <img src={service == false ? agree_checkbox_icon.src : agree_checked_icon.src} />
                        <label className={`${checkBoxLabelClassName}`}>서비스 이용 동의 (필수)</label>
                    </div>
                    <div className="pt-6"></div>
                    <div className="w-[486px] h-[146px] pl-4 pr-1 py-2 bg-stone-50 rounded-lg border border-gray-200 justify-start items-end gap-2 inline-flex">
                        <div className="w-[440px] h-[124px]">
                            <span className="text-black text-sm font-normal font-['Pretendard']">서비스 이용약관 동의 2</span>
                        </div>
                    </div>
                    <div className="pt-4"></div>
                    <div className={checkBoxClassName}
                        onClick={() => setPersonalChecked(!personal)}>
                        <img src={personal == false ? agree_checkbox_icon.src : agree_checked_icon.src} />
                        <label className={`${checkBoxLabelClassName}`}>개인정보 수집 (필수)</label>
                    </div>
                    <div className="pt-6"></div>
                    <div className="w-[486px] h-[146px] pl-4 pr-1 py-2 bg-stone-50 rounded-lg border border-gray-200 justify-start items-end gap-2 inline-flex">
                        <div className="w-[440px] h-[124px]">
                            <span className="text-black text-sm font-normal font-['Pretendard']">서비스 이용약관 동의 3</span>
                        </div>
                    </div>
                    <div className="pt-4"></div>
                    <div className={checkBoxClassName}
                        onClick={() => setMarketingChecked(!marketing)}>
                        <img src={marketing == false ? agree_checkbox_icon.src : agree_checked_icon.src} />
                        <label className={`${checkBoxLabelClassName}`}>마케팅 정보 수신 동의 (필수)</label>
                    </div>

                    <div className="pt-4"></div>
                    <div className="w-[489px] h-[0px] border border-black"></div>
                    <div className="pt-4"></div>

                    <div className={checkBoxClassName}
                        onClick={() => {
                            setAllChecked(!all);
                            setServiceChecked(!all);
                            setPersonalChecked(!all);
                            setMarketingChecked(!all);
                        }}>
                        <img src={all == false ? agree_checkbox_icon.src : agree_checked_icon.src} />
                        <label className={`${checkBoxLabelClassName}`}>전체 약관 동의</label>
                    </div>
                    <div className="pt-4"></div>

                    <div className="pb-[102px] flex-col justify-start items-start gap-4 flex">
                        <button className="w-[486px] px-[200px] py-6 bg-dark_color rounded 
                                        justify-center items-center gap-2.5 inline-flex 
                                        text-center text-white text-lg font-semibold font-['Pretendard']"
                                onClick={onClickNextButton}>다음</button>
                    </div>
                    
                </div>
                
            </div>
        </div>
    );
}