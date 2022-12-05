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
} from "../types"
import { GlobalState, Project, Task, Comment, Status } from "../../types"
import tasksReducer from "./tasksReducer"
import { getNextId } from "../../utils/getNextId"
import dayjs from "dayjs"

export type RootAction = {
    type: string
    projectId?: number
    projectLabel?: string
    project?: Project
    taskId?: number
    task?: Task
    status?: Status
    comment?: Comment
    commentId?: number
}

const initialState = {
    projects: {},
}

const rootReducer = (
    state: GlobalState = initialState,
    action: RootAction
): GlobalState => {
    switch (action.type) {
        case CREATE_PROJECT:
            const id = getNextId(state.projects)
            const newProject: Project = {
                id,
                label: action.projectLabel,
                createdAt: dayjs(),
                tasks: [],
            }

            return {
                projects: {
                    ...state.projects,
                    [id]: newProject,
                },
            }
        case MODIFY_PROJECT:
            return {
                projects: {
                    ...state.projects,
                    [action.projectId]: {
                        ...state.projects[action.projectId],
                        label: action.projectLabel,
                    },
                },
            }
        case DELETE_PROJECT:
            const { [action.projectId]: _, ...rest } = state.projects
            return {
                projects: rest,
            }
        case CREATE_TASK:
            return {
                projects: {
                    ...state.projects,
                    [action.project.id]: {
                        ...state.projects[action.project.id],
                        tasks: tasksReducer(
                            state.projects[action.project.id].tasks,
                            {
                                type: CREATE_TASK,
                                task: action.task,
                            }
                        ),
                    },
                },
            }
        case MODIFY_TASK:
            return {
                projects: {
                    ...state.projects,
                    [action.project.id]: {
                        ...state.projects[action.project.id],
                        tasks: tasksReducer(
                            state.projects[action.project.id].tasks,
                            {
                                type: MODIFY_TASK,
                                task: action.task,
                            }
                        ),
                    },
                },
            }
        case DELETE_TASK:
            return {
                projects: {
                    ...state.projects,
                    [action.project.id]: {
                        ...state.projects[action.project.id],
                        tasks: tasksReducer(
                            state.projects[action.project.id].tasks,
                            {
                                type: DELETE_TASK,
                                task: action.task,
                            }
                        ),
                    },
                },
            }
        case CHANGE_TASK_STATUS:
            return {
                projects: {
                    ...state.projects,
                    [action.project.id]: {
                        ...state.projects[action.project.id],
                        tasks: tasksReducer(
                            state.projects[action.project.id].tasks,
                            {
                                type: CHANGE_TASK_STATUS,
                                task: action.task,
                                status: action.status,
                            }
                        ),
                    },
                },
            }
        case CREATE_COMMENT:
            return {
                projects: {
                    ...state.projects,
                    [action.projectId]: {
                        ...state.projects[action.projectId],
                        tasks: tasksReducer(
                            state.projects[action.projectId].tasks,
                            {
                                type: CREATE_COMMENT,
                                taskId: action.taskId,
                                comment: action.comment,
                            }
                        ),
                    },
                },
            }
        case MODIFY_COMMENT:
            return {
                projects: {
                    ...state.projects,
                    [action.projectId]: {
                        ...state.projects[action.projectId],
                        tasks: tasksReducer(
                            state.projects[action.projectId].tasks,
                            {
                                type: MODIFY_COMMENT,
                                taskId: action.taskId,
                                comment: action.comment,
                            }
                        ),
                    },
                },
            }
        case DELETE_COMMENT:
            return {
                projects: {
                    ...state.projects,
                    [action.projectId]: {
                        ...state.projects[action.projectId],
                        tasks: tasksReducer(
                            state.projects[action.projectId].tasks,
                            {
                                type: DELETE_COMMENT,
                                taskId: action.taskId,
                                commentId: action.commentId,
                            }
                        ),
                    },
                },
            }
        default:
            return state
    }
}

export default rootReducer
