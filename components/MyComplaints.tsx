type Reactions = {
  count_of_good: number
  count_of_bad: number
}

type Comment = {
  nickname: string
  date: string
  id: string
  content: string
  like: boolean
  likecount: string
  child_comment?: Comment[]
}

type Post = {
  id: number
  isnew: boolean
  popular: boolean
  hits: number
  count_of_comments: string
  image_urls: any
  category_id: number
  title: string
  content: string
  nickname: string
  usefull: boolean
  reactions: Reactions
  date: string
  comment?: Comment[]
}

type ResponseData = Post[]

export default function MyComplaints({
  responseData,
  category
}: {
  responseData: ResponseData
  category: string
}) {
  return (
    <div>
      <p>나의민원</p>
    </div>
  )
}
