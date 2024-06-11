
type discount = {
    maintenance_discount: number //관리비차감
    hiring_discount: number //일자리지원차감
    summer_electricity_discount: number //전기하계할인
    parking_fee_discount: number //주차비차감
    voucher_discount: number //바우처할인
    electricity_discount: number //전기할인요금
    water_discount: number //수도할인요금
}

type data = {
    column: string
    label: string
    value: number
}

export default function DiscountModal({isOpen, onClose, data} : {isOpen: boolean, onClose: ()=> void, data: discount}) {
    if(!isOpen) return null

    const values = Object.values(data)
    const total = values.reduce((prev, curr) => prev + curr, 0)

    const label = [
        {column: "maintenance_discount", label: "관리비차감", value: values[0]}, 
        {column: "hiring_discount", label: "일자리지원차감", value: values[1]}, 
        {column: "summer_electricity_discount", label: "전기하계할인", value: values[2]}, 
        {column: "parking_fee_discount", label: "주차비차감", value: values[3]}, 
        {column: "voucher_discount", label: "바우처할인", value: values[4]}, 
        {column: "electricity_discount", label: "전기할인요금", value: values[5]},
        {column: "water_discount", label: "수도할인요금", value: values[6]}
    ]

    return (
        <div className="flex fixed inset-0 bg-gray-800 bg-opacity-75 justify-center items-center z-50">
            <div className="w-[500px] bg-white rounded-2xl overflow-hidden">
                <div className="bg-main_color text-white text-lg font-medium flex justify-between items-center px-6 py-4">
                    <div className="w-6 h-6"></div>
                    <div className="text-center flex-grow">알림</div>
                    <button className="w-6 h-6 flex justify-center items-center" onClick={onClose}>
                        <p>X</p>
                    </button>
                </div>
                <div className="flex flex-col gap-6 pt-6 pb-8 justify-center items-center">
                    <div className="w-96 h-14 flex-col justify-start items-center gap-2 inline-flex">
                        <p className="w-96 text-center text-grey_300 text-xl font-medium">패스트아파트 101동 1001호</p>
                        <p className="justify-center gap-1 inline-flex">
                            <p className="text-center text-grey_900 text-xl font-semibold">세대감면금액은</p>
                            <p className="text-center text-main_color text-xl font-semibold">{Math.abs(total).toLocaleString('ko-KR')}원</p>
                            <p className="text-center text-grey_900 text-xl font-semibold">입니다.</p>
                        </p>
                    </div>
                    <div className="flex flex-col items-center pb-1 rounded-lg border border-grey_250 ">
                        <div className="w-96 px-4 py-3 rounded-tl-lg rounded-tr-lg bg-grey_250 justify-center items-center gap-8 inline-flex">
                            <p className="w-1/2 text-center text-white text-sm font-medium tracking-wide">항목</p>
                            <p className="w-1/2 text-center text-white text-sm font-medium tracking-wide">금액</p>
                        </div>
                        {
                            label.map((item) => (
                                <div className="inline-flex w-full justify-center items-center py-3  gap-4 border-t border-grey_200">
                                    <p className="w-1/2 text-center text-grey_500 font-medium">{item.label}</p>
                                    <p className="w-1/2 text-center text-grey_500 font-medium">{Math.abs(item.value).toLocaleString('ko-KR')}원</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="border-t border-grey_250 p-5 hover:cursor-pointer text-center"
                     onClick={onClose}>
                    닫기
                </div>
            </div>
        </div>
    )
}
