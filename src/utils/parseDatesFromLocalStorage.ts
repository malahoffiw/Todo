import dayjs from "dayjs"
import { CommentsList, GlobalState, SubTasksList, TasksList } from "../types"

/**
 * Parses dates received from localStorage
 * from strings to Dayjs objects.
 *
 */
export const parseDatesFromLocalStorage = (state: GlobalState): GlobalState => {
    for (let project of Object.values(state.projects)) {
        project.createdAt = dayjs(project.createdAt)

        parseTasksDatesFromLocalStorage(project.tasks)
    }

    return state
}

const parseTasksDatesFromLocalStorage = (tasks: TasksList) => {
    for (let task of Object.values(tasks)) {
        task.createdAt = dayjs(task.createdAt)
        if (task.expiresAt) task.expiresAt = dayjs(task.expiresAt)

        parseCommentsDatesFromLocalStorage(task.comments)
        parseSubTasksDatesFromLocalStorage(task.subtasks)
    }

    return tasks
}

const parseSubTasksDatesFromLocalStorage = (subtasks: SubTasksList) => {
    for (let subtask of Object.values(subtasks)) {
        subtask.createdAt = dayjs(subtask.createdAt)
        if (subtask.expiresAt) subtask.expiresAt = dayjs(subtask.expiresAt)
    }

    return subtasks
}

const parseCommentsDatesFromLocalStorage = (comments: CommentsList) => {
    for (let comment of Object.values(comments)) {
        comment.createdAt = dayjs(comment.createdAt)

        if (Object.keys(comment.replies).length > 0) {
            parseCommentsDatesFromLocalStorage(comment.replies)
        }
    }

    return comments
}
