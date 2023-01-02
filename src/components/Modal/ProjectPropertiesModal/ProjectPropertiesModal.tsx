import React from "react"
import { useAppSelector } from "../../../hooks/redux"
import { Project } from "../../../types"
import { getProjectTasksAmount } from "../../../utils/getProjectTasks"
import styles from "./ProjectPropertiesModal.module.scss"

type ProjectFeaturesModalProps = {
    closeModal: () => void
    project: Project
}

/**
 * Modal window to display some selected project properties
 *
 */
const ProjectPropertiesModal = ({
    project,
    closeModal,
}: ProjectFeaturesModalProps) => {
    const tasks = useAppSelector((state) => state.tasks)
    const projectTasksAmount = getProjectTasksAmount(tasks, project.id)

    return (
        <div className={styles.back} onClick={(e) => e.stopPropagation()}>
            <p className={styles.label}>Свойства</p>
            <div>
                <ul className={styles.features}>
                    <li className={styles.features_option}>
                        <p>Название проекта</p>
                        <p>{project.label}</p>
                    </li>
                    <li className={styles.features_option}>
                        <p>Всего задач</p>
                        <p>{projectTasksAmount}</p>
                    </li>
                    <li className={styles.features_option}>
                        <p>Дата создания</p>
                        <p>{project.createdAt.format("HH:mm DD.MM.YYYY")}</p>
                    </li>
                </ul>
                <button className={styles.btn} onClick={() => closeModal()}>
                    Закрыть
                </button>
            </div>
        </div>
    )
}

export default ProjectPropertiesModal
