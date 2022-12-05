import dayjs from "dayjs"
import { CommentsList, GlobalState, TasksList } from "../types"

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
        // parseSubTasksDatesFromLocalStorage
    }

    return tasks
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
