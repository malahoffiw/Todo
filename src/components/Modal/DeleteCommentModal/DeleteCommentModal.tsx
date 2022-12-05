import React from "react"
import styles from "../DeleteTaskModal/DeleteTaskModal.module.scss"

type DeleteCommentModalProps = {
    deleteComment: () => void
    closeModal: () => void
}

const DeleteCommentModal = ({
    deleteComment,
    closeModal,
}: DeleteCommentModalProps) => {
    return (
        <div className={styles.back} onClick={(e) => e.stopPropagation()}>
            <p className={styles.label}>Удаление</p>
            <div className={styles.content}>
                <p>Вы уверены, что хотите удалить комментарий?</p>
                <div className={styles.block}>
                    <button
                        className={styles.block_btn}
                        onClick={() => deleteComment()}
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

export default DeleteCommentModal
