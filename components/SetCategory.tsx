"use client"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setCategory } from "@/redux/slices/categorySlice"
import { AppDispatch } from "@/redux/store"

interface SetCategoryProps {
  category: string
}

const SetCategory = ({ category }: SetCategoryProps) => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(setCategory(category))
  }, [category, dispatch])

  return null
}

export default SetCategory
