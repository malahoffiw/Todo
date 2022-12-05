import React from "react"
import { Dayjs } from "dayjs"
import styles from "./ProjectFeaturesModal.module.scss"

export type TasksStats = {
    amountAll: number
    amountQueue: number
    amountDevelopment: number
    amountDone: number
}

type ProjectFeaturesModalProps = {
    label: string
    tasksStats: TasksStats
    createdAt: Dayjs
    closeModal: () => void
}

const ProjectFeaturesModal = ({
    label,
    tasksStats,
    createdAt,
    closeModal,
}: ProjectFeaturesModalProps) => {
    return (
        <div className={styles.back} onClick={(e) => e.stopPropagation()}>
            <p className={styles.label}>Свойства</p>
            <ul className={styles.features}>
                <li className={styles.features_option}>
                    <p>Название проекта</p>
                    <p>{label}</p>
                </li>
                <li className={styles.features_option}>
                    <p>Всего задач</p>
                    <p>{tasksStats.amountAll}</p>
                </li>
                <li className={styles.features_option}>
                    <p>Дата создания</p>
                    <p>{createdAt.format("HH:mm DD.MM.YYYY")}</p>
                </li>
            </ul>
            <button className={styles.btnSubmit} onClick={() => closeModal()}>
                Закрыть
            </button>
        </div>
    )
}

export default ProjectFeaturesModal
