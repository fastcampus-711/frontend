import type { NextRequest } from "next/server"

export const GET = async (request: NextRequest) => {
  const res = await fetch("https://711.ha-ving.store/menu/front")
  const menus = await res.json()
  return Response.json(menus)
}
