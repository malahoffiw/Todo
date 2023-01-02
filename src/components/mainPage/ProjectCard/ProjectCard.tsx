import React from "react"
import { useAppSelector } from "../../../hooks/redux"
import { Project } from "../../../types"
import { getProjectTasksAmount } from "../../../utils/getProjectTasks"
import styles from "./ProjectCard.module.scss"

type ProjectCardProps = {
    project: Project
}

/**
 * Card of the project displayed on Main page.
 *
 */
const ProjectCard = ({ project }: ProjectCardProps) => {
    const projectTasks = useAppSelector((state) => state.tasks)
    const projectTasksAmount = getProjectTasksAmount(projectTasks, project.id)

    const label =
        project.label.length > 14
            ? project.label.slice(0, 13) + "..."
            : project.label

    return (
        <li className={styles.card}>
            <p className={styles.card_label}>{label}</p>
            <p className={styles.card_date}>
                {project.createdAt.format("HH:mm DD.MM.YYYY")}
            </p>
            <p className={styles.card_tasks}>Задачи: {projectTasksAmount}</p>
        </li>
    )
}

export default ProjectCard
