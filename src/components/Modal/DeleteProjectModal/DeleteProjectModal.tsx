import React from "react"
import styles from "./DeleteProjectModal.module.scss"
import { useAppDispatch } from "../../../hooks/redux"
import { deleteProject } from "../../../redux/actions"
import { Link } from "react-router-dom"

type DeleteProjectModalProps = {
    id: number
    label: string
    tasksAmount: number
    closeModal: () => void
}

const DeleteProjectModal = ({
    id,
    label,
    tasksAmount,
    closeModal,
}: DeleteProjectModalProps) => {
    const dispatch = useAppDispatch()

    return (
        <div className={styles.back} onClick={(e) => e.stopPropagation()}>
            <p className={styles.label}>Удаление</p>
            <p>
                Вы уверены, что хотите удалить проект <b>{label}</b>?
            </p>
            <p className={styles.message}>
                Действие приведет к удалению всех (<b>{tasksAmount}</b>) задач
                проекта
            </p>
            <div className={styles.block}>
                <Link
                    to={"/"}
                    className={styles.block_btn}
                    onClick={() => {
                        dispatch(deleteProject(id))
                    }}
                >
                    Удалить
                </Link>
                <button
                    className={styles.block_btn}
                    onClick={() => closeModal()}
                >
                    Отмена
                </button>
            </div>
        </div>
    )
}

export default DeleteProjectModal
