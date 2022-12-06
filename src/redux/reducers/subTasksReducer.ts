import { SubTask, SubTasksList } from "../../types"
import { CREATE_SUBTASK, DELETE_SUBTASK, MODIFY_SUBTASK } from "../types"

export type SubTaskAction = {
    type: string
    subTask?: SubTask
    subTaskId?: number
}

const subTasksReducer = (
    state: SubTasksList,
    action: SubTaskAction
): SubTasksList => {
    switch (action.type) {
        case CREATE_SUBTASK:
            return {
                ...state,
                [action.subTask.id]: action.subTask,
            }
        case MODIFY_SUBTASK:
            return {
                ...state,
                [action.subTask.id]: action.subTask,
            }
        case DELETE_SUBTASK:
            const { [action.subTaskId]: _, ...rest } = state
            return rest
        default:
            return state
    }
}

export default subTasksReducer
