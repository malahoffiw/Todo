import { Comment, Status, SubTask, Task, TasksList } from "../../types"
import {
    CREATE_COMMENT,
    CREATE_SUBTASK,
    CREATE_TASK,
    DELETE_COMMENT,
    DELETE_SUBTASK,
    DELETE_TASK,
    MODIFY_COMMENT,
    MODIFY_SUBTASK,
    MODIFY_TASK,
} from "../types"
import commentsReducer from "./commentsReducer"
import subTasksReducer from "./subTasksReducer"

type TasksAction = {
    type: string
    task?: Task
    taskId?: number
    status?: Status
    comment?: Comment
    commentId?: number
    subTask?: SubTask
    subTaskId?: number
}

const tasksReducer = (state: TasksList, action: TasksAction): TasksList => {
    switch (action.type) {
        case CREATE_TASK:
            return {
                ...state,
                [action.task.id]: action.task,
            }
        case MODIFY_TASK:
            return {
                ...state,
                [action.task.id]: action.task,
            }
        case DELETE_TASK:
            const { [action.taskId]: _, ...rest } = state
            return rest
        case CREATE_SUBTASK:
            return {
                ...state,
                [action.taskId]: {
                    ...state[action.taskId],
                    subtasks: subTasksReducer(state[action.taskId].subtasks, {
                        type: CREATE_SUBTASK,
                        subTask: action.subTask,
                    }),
                },
            }
        case MODIFY_SUBTASK:
            return {
                ...state,
                [action.taskId]: {
                    ...state[action.taskId],
                    subtasks: subTasksReducer(state[action.taskId].subtasks, {
                        type: MODIFY_SUBTASK,
                        subTask: action.subTask,
                    }),
                },
            }
        case DELETE_SUBTASK:
            return {
                ...state,
                [action.taskId]: {
                    ...state[action.taskId],
                    subtasks: subTasksReducer(state[action.taskId].subtasks, {
                        type: DELETE_SUBTASK,
                        subTaskId: action.subTaskId,
                    }),
                },
            }
        case CREATE_COMMENT:
            return {
                ...state,
                [action.taskId]: {
                    ...state[action.taskId],
                    comments: commentsReducer(state[action.taskId].comments, {
                        type: CREATE_COMMENT,
                        comment: action.comment,
                    }),
                },
            }
        case MODIFY_COMMENT:
            return {
                ...state,
                [action.taskId]: {
                    ...state[action.taskId],
                    comments: commentsReducer(state[action.taskId].comments, {
                        type: MODIFY_COMMENT,
                        comment: action.comment,
                    }),
                },
            }
        case DELETE_COMMENT:
            return {
                ...state,
                [action.taskId]: {
                    ...state[action.taskId],
                    comments: commentsReducer(state[action.taskId].comments, {
                        type: DELETE_COMMENT,
                        commentId: action.commentId,
                    }),
                },
            }
        default:
            return state
    }
}

export default tasksReducer
