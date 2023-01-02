import { StatusesMap, SubTask, Task } from "../../types"

const getDraggedItem = <T extends Task | SubTask>(
    items: StatusesMap<T>,
    draggableId: string
) => {
    const { queue, development, done } = items
    return (
        queue.find((task) => task.id === Number(draggableId)) ||
        development.find((task) => task.id === Number(draggableId)) ||
        done.find((task) => task.id === Number(draggableId))
    )
}

export default getDraggedItem
