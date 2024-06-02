import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Post {
  id: number
  category_name: string
  title: string
  content: string
}

interface PostState {
  currentPost: Post | null
}

const initialState: PostState = {
  currentPost: null
}

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setCurrentPost: (state, action: PayloadAction<Post>) => {
      state.currentPost = action.payload
    },
    clearCurrentPost: state => {
      state.currentPost = null
    }
  }
})

export const { setCurrentPost, clearCurrentPost } = postSlice.actions
export default postSlice.reducer
