// Extra types required for components.

import { SubTask, Task } from "./index"

export type SortType = "idUp" | "idDown" | "label" | "priority"
export type TaskModalContent = Omit<Task, "id" | "createdAt" | "status">
export type SubTaskModalContent = Omit<SubTask, "id" | "createdAt" | "status">

export type TasksStats = {
    amountAll: number
    amountQueue: number
    amountDevelopment: number
    amountDone: number
}

export type MainTaskModalData = {
    type: string
    data: TaskModalContent
}

export type SubTaskModalData = {
    type: string
    data: SubTaskModalContent
}
