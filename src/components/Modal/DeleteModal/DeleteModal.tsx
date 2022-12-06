import React from "react"
import styles from "./DeleteModal.module.scss"

type DeleteModalProps = {
    label: string
    submessage?: string
    deleteItem: () => void
    closeModal: () => void
}

const DeleteModal = ({
    label,
    submessage,
    deleteItem,
    closeModal,
}: DeleteModalProps) => {
    return (
        <div className={styles.back} onClick={(e) => e.stopPropagation()}>
            <p className={styles.label}>Удаление</p>
            <div className={styles.content}>
                <p>{label}</p>
                <p className={styles.message}>{submessage}</p>
                <div className={styles.block}>
                    <button
                        className={styles.block_btn}
                        onClick={() => deleteItem()}
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

export default DeleteModal
