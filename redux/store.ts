import { configureStore } from "@reduxjs/toolkit"
import categoryReducer from "./slices/categorySlice"
import postReducer from "./slices/postSlice"
import modalReducer from "./slices/modalSlice"

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    post: postReducer,
    modal: modalReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
