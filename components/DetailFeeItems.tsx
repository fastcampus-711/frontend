type DetailItems = {
    label: string;
    value1?: number;
    value2?: number;
  }
export default function DetailFeeItems({items} : {items:DetailItems[]}) {
    return (
        <>
        {items.map((item, index) => (
            <div key={index} className="px-10 py-6 flex justify-between">
                <p className="w-[750px] text-left text-lg font-medium">{item.label}</p>
                <span className="w-full flex gap-[130px]">
                <p className="w-full text-right text-lg font-semibold">{item.value1 === undefined ? "-" : item.value1.toLocaleString('ko-KR')}원</p>
                <p className="w-full text-right text-lg font-semibold">{item.value2 === undefined ? "-" : item.value2.toLocaleString('ko-KR')}원</p>
                <p
                    className={`w-full text-right text-lg font-semibold ${
                    item.value1 !== undefined && item.value2 !== undefined && item.value1 - item.value2 > 0
                        ? "text-increase_color"
                        : item.value1 !== undefined && item.value2 !== undefined && item.value1 - item.value2 < 0
                        ? "text-decrease_color"
                        : "text-grey_500"
                    }`}
                >
                    {item.value1 !== undefined &&
                    item.value2 !== undefined &&
                    (item.value1 - item.value2 > 0
                    ? `+${(item.value1 - item.value2).toLocaleString('ko-KR')}원`
                    : item.value1 - item.value2 < 0
                    ? `${(item.value1 - item.value2).toLocaleString('ko-KR')}원`
                    : "-")}
                </p>
                </span>
            </div>
        ))}
        </>
    )
}