import dayjs from "dayjs"
import { GlobalState, Task, Comment, SubTask, Project } from "../types"

/**
 * Parses dates received from localStorage
 * from strings to Dayjs objects.
 *
 */
export const parseDatesFromLocalStorage = (state: GlobalState): GlobalState => {
    return {
        projects: parseProjectsDatesFromLocalStorage(state.projects),
        tasks: parseTasksDatesFromLocalStorage(state.tasks),
        subtasks: parseSubtasksDatesFromLocalStorage(state.subtasks),
        comments: parseCommentsDatesFromLocalStorage(state.comments),
    }
}

const parseProjectsDatesFromLocalStorage = (projects: Project[]) => {
    for (let project of projects) {
        project.createdAt = dayjs(project.createdAt)
    }

    return projects
}

const parseTasksDatesFromLocalStorage = (tasks: Task[]) => {
    for (let task of tasks) {
        task.createdAt = dayjs(task.createdAt)
        if (task.expiresAt) task.expiresAt = dayjs(task.expiresAt)
    }

    return tasks
}

const parseSubtasksDatesFromLocalStorage = (tasks: SubTask[]) => {
    for (let task of tasks) {
        task.createdAt = dayjs(task.createdAt)
        if (task.expiresAt) task.expiresAt = dayjs(task.expiresAt)
    }

    return tasks
}

const parseCommentsDatesFromLocalStorage = (comments: Comment[]) => {
    for (let comment of comments) {
        comment.createdAt = dayjs(comment.createdAt)

        if (comment.replies.length > 0) {
            parseCommentsDatesFromLocalStorage(comment.replies)
        }
    }

    return comments
}
