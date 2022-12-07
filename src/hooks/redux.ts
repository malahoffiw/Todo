import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../redux/store"
import { GlobalState } from "../types"

// Typed useDispatch hook.
export const useAppDispatch: () => AppDispatch = useDispatch
// Typed useSelector hook.
export const useAppSelector: TypedUseSelectorHook<GlobalState> = useSelector
