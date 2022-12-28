import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SubTask } from "../../types"

const initialState: SubTask[] = []

export const subtasksSlice = createSlice({
    name: "subtasks",
    initialState,
    reducers: {
        createSubTask: (
            state,
            action: PayloadAction<{ newSubtask: SubTask }>
        ) => {
            state.push(action.payload.newSubtask)
        },
        deleteSubTask: (
            state,
            action: PayloadAction<{ subtaskId: number }>
        ) => {
            return state.filter(
                (subtask) => subtask.id !== action.payload.subtaskId
            )
        },
        modifySubTask: (
            state,
            action: PayloadAction<{ subtaskId: number; newSubtask: SubTask }>
        ) => {
            return state.map((subtask) => {
                if (subtask.id === action.payload.subtaskId) {
                    return action.payload.newSubtask
                }
                return subtask
            })
        },
    },
})

export const { createSubTask, deleteSubTask, modifySubTask } =
    subtasksSlice.actions

export default subtasksSlice.reducer
