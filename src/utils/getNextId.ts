import { Project, SubTask, Task, Comment } from "../types"

/**
 * Recursively traverses the map object, collecting ids,
 * and generates the following one.
 *
 */
export const getNextId = (map: Project[] | Task[] | Comment[] | SubTask[]) => {
    let max = -1

    function findMax(map: Project[] | Task[] | Comment[] | SubTask[]) {
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
