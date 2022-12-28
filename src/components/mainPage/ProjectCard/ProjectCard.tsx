import React from "react"
import { Project } from "../../../types"
import styles from "./ProjectCard.module.scss"
import { useAppSelector } from "../../../hooks/redux"

type ProjectCardProps = {
    data: Project
}

/**
 * Card of the project displayed on Main page.
 *
 */
const ProjectCard = ({ data }: ProjectCardProps) => {
    const projectTasks = useAppSelector((state) => state.tasks).filter(
        (task) => task.projectId === data.id
    )
    const label =
        data.label.length > 14 ? data.label.slice(0, 13) + "..." : data.label

    return (
        <li className={styles.card}>
            <p className={styles.card_label}>{label}</p>
            <p className={styles.card_date}>
                {data.createdAt.format("HH:mm DD.MM.YYYY")}
            </p>
            <p className={styles.card_tasks}>Задачи: {projectTasks.length}</p>
        </li>
    )
}

export default ProjectCard
