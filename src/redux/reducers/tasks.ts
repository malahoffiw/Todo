import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Task } from "../../types"

const initialState: Task[] = []

export const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        createTask: (state, action: PayloadAction<{ newTask: Task }>) => {
            state.push(action.payload.newTask)
        },
        deleteTask: (state, action: PayloadAction<{ taskId: number }>) => {
            return state.filter((task) => task.id !== action.payload.taskId)
        },
        modifyTask: (
            state,
            action: PayloadAction<{ taskId: number; newTask: Task }>
        ) => {
            return state.map((task) => {
                if (task.id === action.payload.taskId) {
                    return action.payload.newTask
                }
                return task
            })
        },
    },
})

export const { createTask, deleteTask, modifyTask } = tasksSlice.actions

export default tasksSlice.reducer
