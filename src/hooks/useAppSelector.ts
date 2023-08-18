import { useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from "../services/slices";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector