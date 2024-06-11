import ComplainDetail from "@/components/ComplainDetail"

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/complains/${id}`,
    { cache: "no-store" }
  )
  const responseData = await res.json()
  const category = "complains"
  let componentProps = { responseData, category }

  return (
    <div className="max-w-[1200px] m-auto">
      <ComplainDetail {...componentProps} />
    </div>
  )
}
