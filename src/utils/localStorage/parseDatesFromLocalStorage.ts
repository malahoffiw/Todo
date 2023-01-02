import dayjs from "dayjs"
import {
    GlobalState,
    Task,
    Comment,
    SubTask,
    Project,
    StatusesMap,
} from "../../types"

/**
 * Parses dates received from localStorage
 * from strings to Dayjs objects.
 *
 */
export const parseDatesFromLocalStorage = (state: GlobalState): GlobalState => {
    return {
        projects: parseProjectsDatesFromLocalStorage(state.projects),
        tasks: parseTasksDatesFromLocalStorage<Task>(state.tasks),
        subtasks: parseTasksDatesFromLocalStorage<SubTask>(state.subtasks),
        comments: parseCommentsDatesFromLocalStorage(state.comments),
    }
}

const parseProjectsDatesFromLocalStorage = (projects: Project[]) => {
    for (let project of projects) {
        project.createdAt = dayjs(project.createdAt)
    }

    return projects
}

const parseTasksDatesFromLocalStorage = <T extends Task | SubTask>(
    tasks: StatusesMap<T>
) => {
    for (let tasksByStatus of Object.values(tasks)) {
        for (let task of tasksByStatus) {
            task.createdAt = dayjs(task.createdAt)
            if (task.expiresAt) task.expiresAt = dayjs(task.expiresAt)
        }
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
