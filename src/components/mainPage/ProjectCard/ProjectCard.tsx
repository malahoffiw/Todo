import React from "react"
import { Project } from "../../../types"
import styles from "./ProjectCard.module.scss"

type ProjectCardProps = {
    data: Project
}

const ProjectCard = ({ data }: ProjectCardProps) => {
    const label =
        data.label.length > 14 ? data.label.slice(0, 13) + "..." : data.label

    return (
        <li className={styles.card}>
            <p className={styles.card_label}>{label}</p>
            <p className={styles.card_date}>
                {data.createdAt.format("HH:mm DD.MM.YYYY")}
            </p>
            <p className={styles.card_tasks}>
                Задачи: {Object.keys(data.tasks).length}
            </p>
        </li>
    )
}

export default ProjectCard
