import DetailFeeContent from "@/components/DetailFeeContent";
import MyFeeContent from "@/components/MyFeeContent";
import fs from "fs";

type api = {
    success: boolean
    status: number
    timestamp: number
    data: any
}
export default async function Page(
    {params, searchParams}
    : {params: { category: string }
        searchParams: { year: number; month: number}}) 
{
    const { category } = params
    const { year, month } = searchParams

    // const res = await fetch(
    //     `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/fee/${category}?year=${year}&month=${month}`
    // )

    const feeFetch = async(type: string, year: number, month: number) => {
        try {
            let url = `https://711.ha-ving.store/maintenance-bills/${type}?year=${year}&month=${month}`
    
            const response = await fetch(url,{ cache: "no-store" })
    
            if (response.ok) {
                const res = await response.json()
                return res
            }
        } catch (error) {
          console.error("관리비 Fetch 에러 발생:", error)
        }
    }

    let contentComponent
    let componentProps

    if (category === "my") {
        await Promise.all([
            feeFetch("circular-chart", year, month), //도넛 차트 API
            feeFetch("summary", year, month), //납기, 감면, 미납, 납기 후 API
            feeFetch("month-on-month", year, month), //전월 대비 API
            feeFetch("year-on-year", year, month), //전년 대비 API
            feeFetch("square-on-square", year, month), //동일면적 API
            feeFetch("details", year, month) //관리비 세부 정보 API
        ]).then((datas)=> {
            const [circular, summary, month_on_month, year_on_year, square_on_square, details] = datas
            componentProps = {year, month, circular, summary, month_on_month, year_on_year, square_on_square, details}
            contentComponent = <MyFeeContent {...componentProps}/>
        }).catch((error) => {
            console.error("fee page(my) error: ", error)
        })
    } 
    else if (category === "detail"){
        await Promise.all([
            feeFetch("energy-consumption-status", year, month), //에너지 소비현황 API
            feeFetch("details",year, month), //당월 고지서 상세내역 API
            feeFetch("details", year, Number(month)-Number(1)) //전월 고지서 상세내역 API
        ]).then((datas)=> {
            const [energy, details, lastYearDetails] = datas
            componentProps = {year, month, energy, details, lastYearDetails}
            contentComponent = <DetailFeeContent {...componentProps}/>
        }).catch((error) => {
            console.error("fee page(detail) error: ", error)
        })
        
    }
    else {
        contentComponent = null
    }

    return (
        <div className="max-w-[1200px] m-auto mb-40">
           {contentComponent}
        </div>
    )
}