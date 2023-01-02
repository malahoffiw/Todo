import { DropResult } from "react-beautiful-dnd"
import { Dispatch } from "redux"
import { Status, StatusesMap, SubTask } from "../../../types"
import {
    changeSubTaskStatus,
    reorderSubTask,
} from "../../../redux/reducers/subtasks"
import getDraggedItem from "../getDraggedItem"

// Defines the behavior of the SUBTASK when dragging is completed.
const onDragEnd = (
    dropResult: DropResult,
    taskSubtasks: StatusesMap<SubTask>,
    dispatch: Dispatch
) => {
    const { destination, source, draggableId } = dropResult

    if (!destination) return

    if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
    )
        return

    const draggedSubtask = getDraggedItem<SubTask>(taskSubtasks, draggableId)

    if (destination.droppableId === source.droppableId) {
        dispatch(
            reorderSubTask({
                status: draggedSubtask.status,
                sourceIndex: source.index,
                destinationIndex: destination.index,
            })
        )
    } else {
        dispatch(
            changeSubTaskStatus({
                prevStatus: source.droppableId as Status,
                prevIndex: source.index,
                newStatus: destination.droppableId as Status,
                newIndex: destination.index,
            })
        )
    }
}

export default onDragEnd
