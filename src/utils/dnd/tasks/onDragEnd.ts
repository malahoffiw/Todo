import { DropResult } from "react-beautiful-dnd"
import { Dispatch } from "redux"
import { changeTaskStatus, reorderTask } from "../../../redux/reducers/tasks"
import { Status, StatusesMap, Task } from "../../../types"
import getDraggedItem from "../getDraggedItem"

// Defines the behavior of the TASK when dragging is completed.
const onDragEnd = (
    dropResult: DropResult,
    projectTasks: StatusesMap<Task>,
    dispatch: Dispatch
) => {
    const { destination, source, draggableId } = dropResult

    if (!destination) return

    if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
    )
        return

    const draggedTask = getDraggedItem<Task>(projectTasks, draggableId)

    if (destination.droppableId === source.droppableId) {
        dispatch(
            reorderTask({
                status: draggedTask.status,
                sourceIndex: source.index,
                destinationIndex: destination.index,
            })
        )
    } else {
        dispatch(
            changeTaskStatus({
                prevStatus: source.droppableId as Status,
                prevIndex: source.index,
                newStatus: destination.droppableId as Status,
                newIndex: destination.index,
            })
        )
    }
}

export default onDragEnd
