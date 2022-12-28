// The main interfaces required to describe the Redux state object.

import { Dayjs } from "dayjs"
import { IMeta } from "react-dropzone-uploader"

export interface GlobalState {
    projects: Project[]
    tasks: Task[]
    subtasks: SubTask[]
    comments: Comment[]
}

export interface Project {
    id: number
    label: string
    createdAt: Dayjs
}

export interface Task {
    id: number
    projectId: number
    label: string
    description: string
    createdAt: Dayjs
    expiresAt?: Dayjs
    priority: Priority
    status: Status
    files: IMeta[]
}

export interface Comment {
    id: number
    taskId: number
    message: string
    createdAt: Dayjs
    replies: Comment[]
}

export interface SubTask {
    id: number
    taskId: number
    label: string
    description: string
    createdAt: Dayjs
    expiresAt?: Dayjs
    priority: Priority
    status: Status
}

export type Status = "queue" | "development" | "done"
export type Priority = "regular" | "high" | "low"
