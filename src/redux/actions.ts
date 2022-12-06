import {
    CREATE_COMMENT,
    CREATE_PROJECT,
    CREATE_SUBTASK,
    CREATE_TASK,
    DELETE_COMMENT,
    DELETE_PROJECT,
    DELETE_SUBTASK,
    DELETE_TASK,
    MODIFY_COMMENT,
    MODIFY_PROJECT,
    MODIFY_SUBTASK,
    MODIFY_TASK,
} from "./types"
import { Comment, SubTask, Task } from "../types"

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

export const createTask = (projectId: number, task: Task) => {
    return {
        type: CREATE_TASK,
        projectId,
        task,
    }
}

export const deleteTask = (projectId: number, taskId: number) => {
    return {
        type: DELETE_TASK,
        projectId,
        taskId,
    }
}

export const modifyTask = (projectId: number, task: Task) => {
    return {
        type: MODIFY_TASK,
        projectId,
        task,
    }
}

export const createSubTask = (
    projectId: number,
    taskId: number,
    subTask: SubTask
) => {
    return {
        type: CREATE_SUBTASK,
        projectId,
        taskId,
        subTask,
    }
}

export const deleteSubTask = (
    projectId: number,
    taskId: number,
    subTaskId: number
) => {
    return {
        type: DELETE_SUBTASK,
        projectId,
        taskId,
        subTaskId,
    }
}

export const modifySubTask = (
    projectId: number,
    taskId: number,
    subTask: SubTask
) => {
    return {
        type: MODIFY_SUBTASK,
        projectId,
        taskId,
        subTask,
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
