import { Dayjs } from "dayjs"

export interface GlobalState {
    projects: ProjectsList
}

export interface Project {
    id: number
    label: string
    tasks: TasksList
    createdAt: Dayjs
}

export interface Task {
    id: number
    label: string
    description: string
    createdAt: Dayjs
    expiresAt?: Dayjs
    priority: Priority
    status: Status
    comments: CommentsList
    subtasks: SubTasksList
    files: string[]
}

export interface Comment {
    id: number
    message: string
    createdAt: Dayjs
    replies: CommentsList
}

export type ProjectsList = Record<number, Project>
export type TasksList = Record<number, Task>
export type CommentsList = Record<number, Comment>
export type SubTasksList = Record<number, SubTask>

export type SubTask = Omit<Task, "subtasks">
export type Status = "queue" | "development" | "done"
export type Priority = "regular" | "high" | "low"
