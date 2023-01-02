import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Status, Task, StatusesMap } from "../../types"
import { SortType } from "../../types/components"

const initialState: StatusesMap<Task> = {
    queue: [],
    development: [],
    done: [],
}
export const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        createTask: (state, action: PayloadAction<{ newTask: Task }>) => {
            const { newTask } = action.payload
            state[newTask.status].unshift(newTask)
        },
        deleteTask: (
            state,
            action: PayloadAction<{ taskStatus: Status; taskId: number }>
        ) => {
            return {
                ...state,
                [action.payload.taskStatus]: state[
                    action.payload.taskStatus
                ].filter((task) => task.id !== action.payload.taskId),
            }
        },
        modifyTask: (
            state,
            action: PayloadAction<{ taskId: number; newTask: Task }>
        ) => {
            return {
                ...state,
                [action.payload.newTask.status]: state[
                    action.payload.newTask.status
                ].map((task) => {
                    if (task.id === action.payload.taskId) {
                        return action.payload.newTask
                    }
                    return task
                }),
            }
        },
        changeTaskStatus: (
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
        reorderTask: (
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
        sortTasks: (state, action: PayloadAction<{ sortType: SortType }>) => {
            const { sortType } = action.payload
            const sortByPriority = (a: Task, b: Task) => {
                let first
                if (a.priority === "high") first = 2
                if (a.priority === "regular") first = 1
                if (a.priority === "low") first = 0

                let second
                if (b.priority === "high") second = 2
                if (b.priority === "regular") second = 1
                if (b.priority === "low") second = 0

                return second - first
            }

            switch (sortType) {
                case "custom":
                    break
                case "idDown":
                    state.queue.sort((a, b) => b.id - a.id)
                    state.development.sort((a, b) => b.id - a.id)
                    state.done.sort((a, b) => b.id - a.id)
                    break
                case "idUp":
                    state.queue.sort((a, b) => a.id - b.id)
                    state.development.sort((a, b) => a.id - b.id)
                    state.done.sort((a, b) => a.id - b.id)
                    break
                case "label":
                    state.queue.sort((a, b) =>
                        ("" + a.label).localeCompare(b.label)
                    )
                    state.development.sort((a, b) =>
                        ("" + a.label).localeCompare(b.label)
                    )
                    state.done.sort((a, b) =>
                        ("" + a.label).localeCompare(b.label)
                    )
                    break
                case "priority":
                    state.queue.sort(sortByPriority)
                    state.development.sort(sortByPriority)
                    state.done.sort(sortByPriority)
                    break
            }
        },
    },
})

export const {
    createTask,
    deleteTask,
    modifyTask,
    reorderTask,
    changeTaskStatus,
    sortTasks,
} = tasksSlice.actions

export default tasksSlice.reducer
