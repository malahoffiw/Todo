// The main interfaces required to describe the Redux state object.

import { Dayjs } from "dayjs"
import { IMeta } from "react-dropzone-uploader"

export interface GlobalState {
    projects: Project[]
    tasks: StatusesMap<Task>
    subtasks: StatusesMap<SubTask>
    comments: Comment[]
}

export interface Project {
    id: number
    label: string
    createdAt: Dayjs
}

export interface StatusesMap<T extends Task | SubTask> {
    queue: T[]
    development: T[]
    done: T[]
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

export interface Comment {
    id: number
    taskId: number
    message: string
    createdAt: Dayjs
    replies: Comment[]
}

export type Status = "queue" | "development" | "done"
export type Priority = "regular" | "high" | "low"
