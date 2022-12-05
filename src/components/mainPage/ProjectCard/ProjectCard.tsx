import React from "react"
import { Project } from "../../../types"
import styles from "./ProjectCard.module.scss"

type ProjectCardProps = {
    data: Project
}

const ProjectCard = ({ data }: ProjectCardProps) => {
    return (
        <li className={styles.card}>
            <p className={styles.cardLabel}>{data.label}</p>
            <p className={styles.cardDate}>
                {data.createdAt.format("HH:mm DD.MM.YYYY")}
            </p>
            <p className={styles.cardTasks}>
                Задачи: {Object.keys(data.tasks).length}
            </p>
        </li>
    )
}

export default ProjectCard
