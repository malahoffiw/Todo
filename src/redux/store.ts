import { configureStore } from "@reduxjs/toolkit"
import { loadState, saveState } from "../utils/localStorage"
import projectsReducer from "./reducers/projects"
import subtasksReducer from "./reducers/subtasks"
import tasksReducer from "./reducers/tasks"
import commentsReducer from "./reducers/comments"

const persistedState = loadState()

const store = configureStore({
    reducer: {
        projects: projectsReducer,
        tasks: tasksReducer,
        subtasks: subtasksReducer,
        comments: commentsReducer,
    },
    preloadedState: persistedState,
})

store.subscribe(() => {
    saveState(store.getState())
})

export type AppDispatch = typeof store.dispatch
export default store
