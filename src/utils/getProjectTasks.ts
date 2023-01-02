import { StatusesMap, Task } from "../types"

export const getProjectTasks = (
    tasks: StatusesMap<Task>,
    projectId: number
): StatusesMap<Task> => {
    return {
        queue: tasks.queue.filter((task) => task.projectId === projectId),
        development: tasks.development.filter(
            (task) => task.projectId === projectId
        ),
        done: tasks.done.filter((task) => task.projectId === projectId),
    }
}

export const getProjectTasksAmount = (
    tasks: StatusesMap<Task>,
    projectId: number
) => {
    return (
        tasks.queue.filter((task) => task.projectId === projectId).length +
        tasks.development.filter((task) => task.projectId === projectId)
            .length +
        tasks.done.filter((task) => task.projectId === projectId).length
    )
}
