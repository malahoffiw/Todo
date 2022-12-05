import { Comment, Status, Task, TasksList } from "../../types"
import {
    CHANGE_TASK_STATUS,
    CREATE_COMMENT,
    CREATE_TASK,
    DELETE_COMMENT,
    DELETE_TASK,
    MODIFY_COMMENT,
    MODIFY_TASK,
} from "../types"
import commentsReducer from "./commentsReducer"

export type TasksAction = {
    type: string
    task?: Task
    taskId?: number
    status?: Status
    comment?: Comment
    commentId?: number
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
            const { [action.task.id]: _, ...rest } = state
            return rest
        case CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.task.id]: {
                    ...state[action.task.id],
                    status: action.status,
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
