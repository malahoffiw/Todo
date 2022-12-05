import { parseDatesFromLocalStorage } from "./parseDatesFromLocalStorage"
import { GlobalState } from "../types"

const initialState: GlobalState = {
    projects: {},
}

export const loadState = (): GlobalState => {
    try {
        const serializedState = localStorage.getItem("state")
        if (serializedState === null) {
            return initialState
        }

        return parseDatesFromLocalStorage(JSON.parse(serializedState))
    } catch (e) {
        return initialState
    }
}

export const saveState = (state: GlobalState) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem("state", serializedState)
    } catch (e) {
        console.warn("Error occurred when saving the state")
    }
}
