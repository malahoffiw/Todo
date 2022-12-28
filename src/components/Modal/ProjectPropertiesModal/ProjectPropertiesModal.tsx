import React from "react"
import { Project } from "../../../types"
import styles from "./ProjectPropertiesModal.module.scss"
import { useAppSelector } from "../../../hooks/redux"

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
    const projectTasks = useAppSelector((state) => state.tasks).filter(
        (task) => task.projectId === project.id
    )

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
                        <p>{projectTasks.length}</p>
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
