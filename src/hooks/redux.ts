import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../redux/store"
import { GlobalState } from "../types"

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<GlobalState> = useSelector
