import React from "react"
import { SubTaskModalData } from "../../../../types/components"
import styles from "../TaskModalHeader/TaskModalHeader.module.scss"

type SubTaskModalHeaderProps = {
    modalData: SubTaskModalData
    closeModal: () => void
    openDeleteModal: () => void
}

/**
 * Header displayed at the top of Subtask modal window.
 *
 */
const SubTaskModalHeader = ({
    modalData,
    closeModal,
    openDeleteModal,
}: SubTaskModalHeaderProps) => {
    return modalData.type === "existing" ? (
        <div className={styles.header}>
            <button className={styles.header_btn} onClick={closeModal}>
                &#10531;
            </button>
            <p className={styles.header_label}>Подзадача</p>
            <button className={styles.header_btn} onClick={openDeleteModal}>
                &#128465;
            </button>
        </div>
    ) : (
        <div className={styles.header}>
            <button className={styles.header_btn} onClick={closeModal}>
                &#10531;
            </button>
            <p className={styles.header_label}>Новая подзадача</p>
            <button className={styles.header_btn} onClick={closeModal}></button>
        </div>
    )
}

export default SubTaskModalHeader
