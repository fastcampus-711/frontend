import FreeBoardDetail from "@/components/FreeBoardDetail"

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/frees/${id}`
  )
  const responseData = await res.json()
  const category = "frees"
  let componentProps = { responseData, category }

  return (
    <div className="max-w-[1200px] m-auto">
      <FreeBoardDetail {...componentProps} />
    </div>
  )
}
