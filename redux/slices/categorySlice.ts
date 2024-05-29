import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface CategoryState {
  value: string
}

const initialState: CategoryState = {
  value: "frees"
}

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    }
  }
})

export const { setCategory } = categorySlice.actions
export default categorySlice.reducer
