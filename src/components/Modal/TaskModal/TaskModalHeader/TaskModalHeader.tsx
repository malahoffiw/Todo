import React from "react"
import { MainTaskModalData } from "../../../../types/components"
import styles from "./TaskModalHeader.module.scss"

type TaskModalHeaderProps = {
    mainModalData: MainTaskModalData
    closeMainModal: () => void
    openCommentsModal: () => void
    openFilesModal: () => void
    openDeleteModal: () => void
}

/**
 * Header displayed at the top of Task Modal window.
 *
 */
const TaskModalHeader = ({
    mainModalData,
    closeMainModal,
    openCommentsModal,
    openFilesModal,
    openDeleteModal,
}: TaskModalHeaderProps) => {
    return mainModalData.type === "existing" ? (
        <div className={styles.header}>
            <button className={styles.header_btn} onClick={closeMainModal}>
                &#10531;
            </button>
            <button className={styles.header_btn} onClick={openCommentsModal}>
                &#128172;
            </button>

            <p className={styles.header_label}>Задача</p>
            <button className={styles.header_btn} onClick={openFilesModal}>
                &#128206;
            </button>
            <button className={styles.header_btn} onClick={openDeleteModal}>
                &#128465;
            </button>
        </div>
    ) : (
        <div className={styles.header}>
            <button className={styles.header_btn} onClick={closeMainModal}>
                &#10531;
            </button>
            <p className={styles.header_label}>Новая задача</p>
            <button className={styles.header_btn} onClick={openFilesModal}>
                &#128206;
            </button>
        </div>
    )
}

export default TaskModalHeader
