import { Task } from "../../types"

/**
 * Checks whether the task name or ID contains a query from the search bar.
 *
 */
const doesTaskMatchQuery = (task: Task, query: string) =>
    task.label.toLowerCase().includes(query.toLowerCase()) ||
    String(task.id) === query

export default doesTaskMatchQuery
