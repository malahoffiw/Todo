import React from "react"
import { Draggable } from "react-beautiful-dnd"
import dayjs from "dayjs"
import { Task } from "../../../types"
import getNoun from "../../../utils/getNoun"
import styles from "./TaskCard.module.scss"

type TaskCardProps = {
    task: Task
    index: number
    onClick: () => void
}

const TaskCard = ({ task, index, onClick }: TaskCardProps) => {
    const label =
        task.label.length > 14 ? task.label.slice(0, 13) + "..." : task.label
    const timeMessage = () => {
        const FIVE_MINUTES_IN_MS = 300000
        const HOUR_IN_MS = 3600000
        const DAY_IN_MS = 86400000
        const time = task.expiresAt?.diff(dayjs())

        if (time < 0) return <p className={styles.minutes}>Время истекло</p>
        if (time < FIVE_MINUTES_IN_MS)
            return <p className={styles.minutes}>Меньше 5 минут</p>
        if (time < HOUR_IN_MS) {
            const left = task.expiresAt?.diff(dayjs(), "minutes")
            return (
                <p className={styles.minutes}>
                    До конца {left}{" "}
                    {getNoun(left, ["минута", "минуты", "минут"])}
                </p>
            )
        }
        if (time < DAY_IN_MS) {
            const left = task.expiresAt?.diff(dayjs(), "hours")
            return (
                <p className={styles.hours}>
                    До конца {left} {getNoun(left, ["час", "часа", "часов"])}
                </p>
            )
        } else {
            const left = task.expiresAt?.diff(dayjs(), "days")
            return (
                <p className={styles.days}>
                    До конца {left} {getNoun(left, ["день", "дня", "дней"])}
                </p>
            )
        }
    }

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
                    <p>{label}</p>
                    {task.status !== "done" && task.expiresAt && (
                        <div className={styles.card_time}>{timeMessage()}</div>
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
