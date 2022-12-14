// Extra types required for components.

import { SubTask, Task } from "./index"

export type SortType = "idUp" | "idDown" | "label" | "priority" | "custom"
export type TaskModalContent = Omit<
    Task,
    "id" | "createdAt" | "status" | "projectId"
>
export type SubTaskModalContent = Omit<
    SubTask,
    "id" | "createdAt" | "status" | "taskId"
>

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
