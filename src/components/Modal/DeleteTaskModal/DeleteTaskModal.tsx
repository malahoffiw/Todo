import React from "react"
import styles from "./DeleteTaskModal.module.scss"

type DeleteTaskModalProps = {
    label: string
    deleteTask: () => void
    closeModal: () => void
}

const DeleteTaskModal = ({
    label,
    deleteTask,
    closeModal,
}: DeleteTaskModalProps) => {
    return (
        <div className={styles.back} onClick={(e) => e.stopPropagation()}>
            <p className={styles.label}>Удаление</p>
            <div className={styles.content}>
                <p>
                    Вы уверены, что хотите удалить задачу <b>{label}</b>?
                </p>
                <div className={styles.block}>
                    <button
                        className={styles.block_btn}
                        onClick={() => deleteTask()}
                    >
                        Удалить
                    </button>
                    <button
                        className={styles.block_btn}
                        onClick={() => closeModal()}
                    >
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteTaskModal
