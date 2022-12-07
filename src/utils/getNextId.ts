import { Project, SubTask, Task, Comment } from "../types"

/**
 * Recursively traverses the map object, collecting ids,
 * and generates the following one.
 *
 */
export const getNextId = (
    map: Record<number, Project | Task | Comment | SubTask>
) => {
    let max = -1

    function findMax(map: Record<number, Project | Task | Comment | SubTask>) {
        for (let value of Object.values(map)) {
            if (value.id > max) max = value.id

            if ("replies" in value && Object.keys(value.replies).length > 0) {
                findMax(value.replies as Record<number, Comment>)
            }
        }
    }
    findMax(map)

    return max === -1 ? 1 : max + 1
}
