import IntegratedSearchContent from "@/components/IntegratedSearchContent"

export default async function IntegratedSearchPage({
    searchParams
}: {
    searchParams: { keyword: string }
}) {
    const { keyword } = searchParams

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/integratedSearch?keyword=${keyword}`,
        { cache: "no-store" }
    )
    const responseData = await res.json()
    let componentProps = {responseData, keyword}

    return (
        <IntegratedSearchContent {...componentProps}/>
    )
}