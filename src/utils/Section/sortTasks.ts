import { Task } from "../../types"
import { SortType } from "../../types/components"

/**
 * Sorts tasks by sections depending on the type selected on the project page.
 *
 */
const sortTasks = (sortType: SortType) => (a: Task, b: Task) => {
    if (sortType === "idDown") return b.id - a.id
    if (sortType === "idUp") return a.id - b.id
    if (sortType === "label") return ("" + a.label).localeCompare(b.label)
    if (sortType === "priority") {
        let first
        if (a.priority === "high") first = 2
        if (a.priority === "regular") first = 1
        if (a.priority === "low") first = 0
        let second
        if (b.priority === "high") second = 2
        if (b.priority === "regular") second = 1
        if (b.priority === "low") second = 0

        return second - first
    }
}

export default sortTasks
