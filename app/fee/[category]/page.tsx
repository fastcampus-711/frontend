import DetailFeeContent from "@/components/DetailFeeContent";
import MyFeeContent from "@/components/MyFeeContent";
import fs from "fs";

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

    // const responseData = await res.json()
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
            feeFetch("circular-chart", year, month), 
            feeFetch("summary", year, month), 
            feeFetch("month-on-month", year, month),
            feeFetch("year-on-year", year, month), 
            feeFetch("square-on-square", year, month)
        ]).then((datas)=> {
            const [circular, summary, month_on_month, year_on_year, square_on_square] = datas
            componentProps = {year, month, circular, summary, month_on_month, year_on_year, square_on_square}
            contentComponent = <MyFeeContent {...componentProps}/>
        }).catch((error) => {
            console.error("fee page(my) error: ", error)
        })
    } 
    else if (category === "detail"){
        await Promise.all([
            feeFetch("energy-consumption-status", year, month), 
            feeFetch("details",year, month),
            feeFetch("details", year, month-1)
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