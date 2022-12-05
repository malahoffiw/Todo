import React from "react"
import { useDrag } from "react-dnd"
import { useAppDispatch } from "../../../hooks/redux"
import { ItemTypes } from "../../../dndTypes"
import { Project, Status, Task } from "../../../types"
import styles from "./TaskCard.module.scss"
import { changeTaskStatus } from "../../../redux/actions"

type TaskProps = {
    task: Task
    onClick: () => void
}

export type DropSection = {
    project: Project
    status: Status
}

const TaskCard = ({ task, onClick }: TaskProps) => {
    const dispatch = useAppDispatch()
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: { task },
        end: (item, monitor) => {
            const dropSection = monitor.getDropResult<DropSection>()
            if (item && dropSection) {
                dispatch(
                    changeTaskStatus(
                        dropSection.project,
                        item.task,
                        dropSection.status
                    )
                )
            }
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    return (
        <li
            onClick={onClick}
            ref={drag}
            key={task.id}
            className={styles.card}
            style={{ opacity: isDragging ? 0 : 1 }}
        >
            <h4 className={styles.label}>{task.label}</h4>
            <div className={`${styles.tag} ${styles[task.priority]}`} />
        </li>
    )
}

export default TaskCard
