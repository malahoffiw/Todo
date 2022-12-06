import React from "react"
import { Draggable } from "react-beautiful-dnd"
import { Task } from "../../../types"
import getExpiresMessage from "../../../utils/getExpiresMessage"
import getTimeMessage from "../../../utils/getTimeMessage"
import styles from "./TaskCard.module.scss"

type TaskCardProps = {
    task: Task
    index: number
    onClick: () => void
}

const TaskCard = ({ task, index, onClick }: TaskCardProps) => {
    const label =
        task.label.length > 14 ? task.label.slice(0, 13) + "..." : task.label

    return (
        <Draggable draggableId={String(task.id)} index={index}>
            {(provided) => (
                <li
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    onClick={onClick}
                    className={`${styles.card} ${
                        task.status === "done" ? styles.done : ""
                    }`}
                >
                    <p>{label}</p>
                    <p className={`${styles.card_time} ${styles.card_id}`}>
                        {`#${task.id}`}
                    </p>
                    <p className={`${styles.card_time} ${styles.going}`}>
                        {getTimeMessage(task.createdAt)}
                    </p>
                    {task.status !== "done" && task.expiresAt && (
                        <div className={`${styles.card_time} ${styles.due}`}>
                            {getExpiresMessage(task.expiresAt)}
                        </div>
                    )}
                    <div
                        className={`${styles.card_tag} ${
                            styles[task.priority]
                        }`}
                    />
                </li>
            )}
        </Draggable>
    )
}

export default TaskCard
