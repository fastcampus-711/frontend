
"use client"

import agree_checkbox_icon from "@/public/icon/agree_false.svg"
import agree_checked_icon from "@/public/icon/agree_true.svg"
import { useRouter } from "next/navigation"
import { useEffect,  useState } from "react"

export default function TermsContent() {
    const router = useRouter()

    const [service, setServiceChecked] = useState(false);
    const [personal, setPersonalChecked] = useState(false);
    const [marketing, setMarketingChecked] = useState(false);
    const [all, setAllChecked] = useState(false);

    const checkBoxClassName = "inline-flex w-full items-center gap-2 hover:cursor-pointer";
    const checkBoxLabelClassName = "hover:cursor-pointer text-base font-medium";

    const [serviceContent, setServiceContent] = useState<string>("")
    const [personalContent, setPersonalContent] = useState<string>("")
    const [marketingContent, setmarketingContent] = useState<string>("")

    const handleNextButton = () => {
        if(!service || !personal) {
            alert("필수 약관에 동의하셔야 합니다.")
            return
        }
        router.push(`/user/join/auth`)
    }

    useEffect(() => {
        if(service && personal && marketing){
            setAllChecked(true)
        } else {
            setAllChecked(false)
        }
    },[service, personal, marketing])


    useEffect(() => {
        const fetchServiceText = async() => {
            try {
                const response = await fetch("/service.txt");
                const content = await response.text();
                setServiceContent(content)
            } catch (e) {
                console.error(e)
            }
        } 
        const fetchPersonalText = async() => {
            try {
                const response = await fetch("/personal.txt");
                const content = await response.text();
                setPersonalContent(content)
            } catch (e) {
                console.error(e)
            }
        } 
        const fetchMarketingText = async() => {
            try {
                const response = await fetch("/marketing.txt");
                const content = await response.text();
                setmarketingContent(content)
            } catch (e) {
                console.error(e)
            }
        } 
        fetchServiceText()
        fetchPersonalText()
        fetchMarketingText()
    })

    return (
        <>
        <div className="max-w-[486px] flex flex-col gap-4">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <div className="px-4 py-2 bg-grey_25 rounded-lg border border-grey_100">
                        <div className="w-[440px] h-[124px] overflow-y-scroll">
                            <span className="text-sm font-normal ">{serviceContent}</span>
                        </div>
                    </div>
                    <input id="service" type="checkbox" className={`${checkBoxClassName} hidden`}
                            checked={service} onChange={() => {setServiceChecked(!service)}}/>
                    <label htmlFor="service" className={`${checkBoxLabelClassName} inline-flex gap-2`}>
                        <img src={service == false ? agree_checkbox_icon.src : agree_checked_icon.src} />             
                        <p>서비스 이용 동의 (필수)</p>
                    </label> 
                </div>
                <div className="flex flex-col gap-4">
                    <div className="px-4 py-2 bg-grey_25 rounded-lg border border-grey_100">
                        <div className="w-[440px] h-[124px] overflow-y-scroll">
                            <span className="text-sm font-normal">{personalContent}</span>
                        </div>
                    </div>

                    <input id="personal" type="checkbox" className={`${checkBoxClassName} hidden`}
                            checked={personal} onChange={() => {setPersonalChecked(!personal)}}/>
                    <label htmlFor="personal" className={`${checkBoxLabelClassName} inline-flex gap-2`}>
                        <img src={personal == false ? agree_checkbox_icon.src : agree_checked_icon.src} />             
                        <p>개인정보 수집 (필수)</p>
                    </label> 
                </div>
                <div className="flex flex-col gap-4">
                    <div className="px-4 py-2 bg-grey_25 rounded-lg border border-grey_100">
                        <div className="w-[440px] h-[124px] overflow-y-scroll">
                            <span className="text-sm font-normal">{marketingContent}</span>
                        </div>
                    </div>

                    <input id="marketing" type="checkbox" className={`${checkBoxClassName} hidden`}
                            checked={marketing} onChange={() => {setMarketingChecked(!marketing)}}/>
                    <label htmlFor="marketing" className={`${checkBoxLabelClassName} inline-flex gap-2`}>
                        <img src={marketing == false ? agree_checkbox_icon.src : agree_checked_icon.src} />               
                        <p>마케팅 정보 수신 동의 (선택)</p>
                    </label>    
                </div>
            </div>
            <div className="w-full h-0 border border-grey_900"></div>
            <input id="allChecked" type="checkbox" className={`${checkBoxClassName} hidden`}
                    checked={all} onChange={() => {setAllChecked(!all); setServiceChecked(!all); setPersonalChecked(!all); setMarketingChecked(!all)}}/>
            <label htmlFor="allChecked" className={`${checkBoxLabelClassName} inline-flex gap-2`}>
                <img src={all == false ? agree_checkbox_icon.src : agree_checked_icon.src} />               
                <p>전체 약관 동의</p>
            </label>  
            <button className="w-full px-[200px] py-6 bg-main_color rounded 
                            text-center text-white text-lg font-semibold"
                    onClick={handleNextButton}>다음</button>
        </div>            
        </>
    )
}