import { getAccessToken } from '@/app/_components/schema/access-token'

export async function GET() {
  const token = await getAccessToken()

  if (!token) {
    return Response.json({ message: 'unauthorized' }, { status: 401 })
  }

  const res = await fetch(`${process.env.API}wishlist`, {
    cache: 'no-store',
    headers: {
      token: token!,
    },
  })

  const data = await res.json()
  return Response.json(data)
}
