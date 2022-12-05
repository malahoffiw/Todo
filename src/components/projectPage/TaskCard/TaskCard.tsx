import React from "react"
import { Draggable } from "react-beautiful-dnd"
import { Task } from "../../../types"
import styles from "./TaskCard.module.scss"

type TaskProps = {
    task: Task
    index: number
    onClick: () => void
}

const TaskCard = ({ task, index, onClick }: TaskProps) => {
    return (
        <Draggable draggableId={String(task.id)} index={index}>
            {(provided) => (
                <li
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    onClick={onClick}
                    key={task.id}
                    className={`${styles.card} ${
                        task.status === "done" ? styles.done : ""
                    }`}
                >
                    <h4 className={styles.label}>{task.label}</h4>
                    <div className={`${styles.tag} ${styles[task.priority]}`} />
                </li>
            )}
        </Draggable>
    )
}

export default TaskCard
