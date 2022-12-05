import {
    CHANGE_TASK_STATUS,
    CREATE_COMMENT,
    CREATE_PROJECT,
    CREATE_TASK,
    DELETE_COMMENT,
    DELETE_PROJECT,
    DELETE_TASK,
    MODIFY_COMMENT,
    MODIFY_PROJECT,
    MODIFY_TASK,
} from "./types"
import { Comment, Project, Status, Task } from "../types"

export const createProject = (projectLabel: string) => {
    return {
        type: CREATE_PROJECT,
        projectLabel,
    }
}
export const deleteProject = (projectId: number) => {
    return {
        type: DELETE_PROJECT,
        projectId,
    }
}
export const modifyProject = (projectId: number, projectLabel: string) => {
    return {
        type: MODIFY_PROJECT,
        projectId,
        projectLabel,
    }
}
export const createTask = (project: Project, task: Task) => {
    return {
        type: CREATE_TASK,
        project,
        task,
    }
}
export const deleteTask = (project: Project, task: Task) => {
    return {
        type: DELETE_TASK,
        project,
        task,
    }
}
export const modifyTask = (project: Project, task: Task) => {
    return {
        type: MODIFY_TASK,
        project,
        task,
    }
}
export const changeTaskStatus = (
    project: Project,
    task: Task,
    status: Status
) => {
    return {
        type: CHANGE_TASK_STATUS,
        project,
        task,
        status,
    }
}
export const createComment = (
    projectId: number,
    taskId: number,
    comment: Comment
) => {
    return {
        type: CREATE_COMMENT,
        projectId,
        taskId,
        comment,
    }
}
export const deleteComment = (
    projectId: number,
    taskId: number,
    commentId: number
) => {
    return {
        type: DELETE_COMMENT,
        projectId,
        taskId,
        commentId,
    }
}
export const modifyComment = (
    projectId: number,
    taskId: number,
    comment: Comment
) => {
    return {
        type: MODIFY_COMMENT,
        projectId,
        taskId,
        comment,
    }
}
