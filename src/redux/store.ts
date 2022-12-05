import { legacy_createStore as createStore } from "redux"
import { loadState, saveState } from "../utils/localStorage"
import reducer from "./reducers/rootReducer"

const persistedState = loadState()
const store = createStore(reducer, persistedState)

store.subscribe(() => {
    saveState(store.getState())
})

export type AppDispatch = typeof store.dispatch
export default store
