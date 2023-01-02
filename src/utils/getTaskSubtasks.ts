import { StatusesMap, SubTask } from "../types"

export const getTaskSubtasks = (
    subtasks: StatusesMap<SubTask>,
    taskId: number
): StatusesMap<SubTask> => {
    return {
        queue: subtasks.queue.filter((task) => task.taskId === taskId),
        development: subtasks.development.filter(
            (task) => task.taskId === taskId
        ),
        done: subtasks.done.filter((task) => task.taskId === taskId),
    }
}

export const getTaskSubtasksAmount = (
    subtasks: StatusesMap<SubTask>,
    taskId: number
) => {
    return (
        subtasks.queue.filter((task) => task.taskId === taskId).length +
        subtasks.development.filter((task) => task.taskId === taskId).length +
        subtasks.done.filter((task) => task.taskId === taskId).length
    )
}
