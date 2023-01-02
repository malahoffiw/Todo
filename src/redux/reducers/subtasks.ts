import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Status, StatusesMap, SubTask } from "../../types"

const initialState: StatusesMap<SubTask> = {
    queue: [],
    development: [],
    done: [],
}

export const subtasksSlice = createSlice({
    name: "subtasks",
    initialState,
    reducers: {
        createSubTask: (
            state,
            action: PayloadAction<{ newSubtask: SubTask }>
        ) => {
            const { newSubtask } = action.payload
            state[newSubtask.status].unshift(newSubtask)
        },
        deleteSubTask: (
            state,
            action: PayloadAction<{ subtaskStatus: Status; subtaskId: number }>
        ) => {
            return {
                ...state,
                [action.payload.subtaskStatus]: state[
                    action.payload.subtaskStatus
                ].filter((task) => task.id !== action.payload.subtaskId),
            }
        },
        modifySubTask: (
            state,
            action: PayloadAction<{ subtaskId: number; newSubtask: SubTask }>
        ) => {
            return {
                ...state,
                [action.payload.newSubtask.status]: state[
                    action.payload.newSubtask.status
                ].map((task) => {
                    if (task.id === action.payload.subtaskId) {
                        return action.payload.newSubtask
                    }
                    return task
                }),
            }
        },
        changeSubTaskStatus: (
            state,
            action: PayloadAction<{
                prevStatus: Status
                prevIndex: number
                newStatus: Status
                newIndex: number
            }>
        ) => {
            const { prevStatus, prevIndex, newStatus, newIndex } =
                action.payload

            const [removed] = state[prevStatus].splice(prevIndex, 1)
            removed.status = newStatus

            state[newStatus].splice(newIndex, 0, removed)
        },
        reorderSubTask: (
            state,
            action: PayloadAction<{
                status: Status
                sourceIndex: number
                destinationIndex: number
            }>
        ) => {
            const { status, sourceIndex, destinationIndex } = action.payload
            const [removed] = state[status].splice(sourceIndex, 1)
            state[status].splice(destinationIndex, 0, removed)
        },
    },
})

export const {
    createSubTask,
    deleteSubTask,
    modifySubTask,
    reorderSubTask,
    changeSubTaskStatus,
} = subtasksSlice.actions

export default subtasksSlice.reducer
