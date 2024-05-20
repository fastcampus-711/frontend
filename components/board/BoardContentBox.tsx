type BoardContentBoxProps = {
  content: string
}

export default function BoardContentBox(props: BoardContentBoxProps) {
  const { content } = props
  return (
    <div className="flex flex-col gap-6 mb-20">
      <img
        src="https://deokbucket.s3.ap-southeast-2.amazonaws.com/pngtree-three-puppies-with-their-mouths-open-are-posing-for-a-photo-image_2902292.jpg"
        alt=""
      />
      <p className="text-grey_900 text-xl font-medium">{content}</p>
    </div>
  )
}
