import React from "react"
import { Draggable } from "react-beautiful-dnd"
import { SubTask } from "../../../../../../types"
import styles from "./SubTaskCard.module.scss"

type SubTaskCardProps = {
    subtask: SubTask
    index: number
    onClick: () => void
}

/**
 * Subtask card displayed in the SubSection.
 *
 */
const SubTaskCard = ({ subtask, index, onClick }: SubTaskCardProps) => {
    return (
        <Draggable draggableId={String(subtask.id)} index={index}>
            {(provided, snapshot) => (
                <li
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={`${styles.card} ${
                        subtask.status === "done" && styles.done
                    }`}
                    onClick={onClick}
                >
                    <div className={styles[subtask.priority]}></div>
                    <p>{subtask.label}</p>
                </li>
            )}
        </Draggable>
    )
}

export default SubTaskCard
