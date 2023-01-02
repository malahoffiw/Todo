import { Project, SubTask, Task, Comment, StatusesMap } from "../types"

/**
 * Recursively traverses the map object of projects or comments,
 * collecting ids, and generates the following one.
 */
export const getNextId = (map: (Project | Comment)[]) => {
    let max = -1

    function findMax(map: (Project | Comment)[]) {
        for (let item of map) {
            if (item.id > max) max = item.id

            if ("replies" in item && item.replies.length > 0) {
                findMax(item.replies)
            }
        }
    }
    findMax(map)

    return max === -1 ? 1 : max + 1
}

/**
 * Traverses the arrays of tasks or subtasks,
 * collecting ids, and generates the following one.
 */
export const getNextTaskId = (tasks: StatusesMap<Task | SubTask>) => {
    let max = -1

    function findMax(map: (Task | SubTask)[]) {
        for (let item of map) {
            if (item.id > max) max = item.id
        }
    }
    findMax(tasks.queue)
    findMax(tasks.development)
    findMax(tasks.done)

    return max === -1 ? 1 : max + 1
}
