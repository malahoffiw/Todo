import React, { useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import TaskEditor from "../../projectPage/TaskEditor/TaskEditor"
import { CommentsList, Priority, Comment } from "../../../types"
import styles from "./TaskModal.module.scss"
import { Editor } from "tinymce"
import { ModalData } from "../../../pages/project"
import Modal from "../Modal"
import DeleteTaskModal from "../DeleteTaskModal/DeleteTaskModal"
import CommentsModal from "../CommentsModal/CommentsModal"

type TaskModalProps = {
    projectId: number
    modalData: ModalData
    setModalData: React.Dispatch<React.SetStateAction<ModalData>>
    editorRef: React.MutableRefObject<Editor>
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    deleteTask: () => void
    closeTaskModal: () => void
    selectedTaskId: number
    submitComment: (comment: Comment, type: string) => void
}

const TaskModal = ({
    projectId,
    modalData,
    setModalData,
    editorRef,
    onSubmit,
    deleteTask,
    closeTaskModal,
    selectedTaskId,
    submitComment,
}: TaskModalProps) => {
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
    const closeDeleteModal = () => setIsDeleteModalVisible(false)
    const openDeleteModal = () => setIsDeleteModalVisible(true)
    const [isCommentsModalVisible, setIsCommentsModalVisible] = useState(false)
    const closeCommentsModal = () => setIsCommentsModalVisible(false)
    const openCommentsModal = () => setIsCommentsModalVisible(true)

    return (
        <>
            <Modal
                isVisible={isDeleteModalVisible}
                closeModal={closeDeleteModal}
            >
                <DeleteTaskModal
                    label={modalData.data.label}
                    deleteTask={() => {
                        deleteTask()
                        closeTaskModal()
                        closeDeleteModal()
                    }}
                    closeModal={closeDeleteModal}
                />
            </Modal>
            {selectedTaskId !== 0 && (
                <Modal
                    isVisible={isCommentsModalVisible}
                    closeModal={closeCommentsModal}
                >
                    <CommentsModal
                        closeModal={closeCommentsModal}
                        projectId={projectId}
                        selectedTaskId={selectedTaskId}
                        submitComment={submitComment}
                    />
                </Modal>
            )}
            <div className={styles.back} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    {modalData.type === "existing" ? (
                        <>
                            <button
                                className={styles.header_btn}
                                onClick={openCommentsModal}
                            >
                                &#128172;
                            </button>
                            <p className={styles.header_label}>Задача</p>
                            <button
                                className={styles.header_btn}
                                onClick={openDeleteModal}
                            >
                                &#128465;
                            </button>
                        </>
                    ) : (
                        <p className={styles.header_label}>Новая задача</p>
                    )}
                </div>

                <form className={styles.form} onSubmit={onSubmit}>
                    <input
                        className={styles.input}
                        type="text"
                        value={modalData.data.label}
                        onChange={(e) => {
                            setModalData((prev) => ({
                                ...prev,
                                data: {
                                    ...prev.data,
                                    label: e.target.value,
                                },
                            }))
                        }}
                        required
                        maxLength={50}
                        placeholder="Название"
                        autoFocus={true}
                    />
                    <fieldset className={styles.select}>
                        <legend className={styles.select_legend}>
                            Приоритет
                        </legend>
                        <select
                            className={styles.select_element}
                            value={modalData.data.priority}
                            onChange={(e) => {
                                setModalData((prev) => ({
                                    ...prev,
                                    data: {
                                        ...prev.data,
                                        priority: e.target.value as Priority,
                                    },
                                }))
                            }}
                        >
                            <option value="low">Низкий</option>
                            <option value="regular">Обычный</option>
                            <option value="high">Высокий</option>
                        </select>
                    </fieldset>

                    <fieldset className={styles.select}>
                        <legend className={styles.select_legend}>Дата</legend>
                        <input
                            value={
                                modalData.data.expiresAt
                                    ? modalData.data.expiresAt.format(
                                          "YYYY-MM-DD HH:mm"
                                      )
                                    : ""
                            }
                            onChange={(e) => {
                                setModalData((prev) => ({
                                    ...prev,
                                    data: {
                                        ...prev.data,
                                        expiresAt: dayjs(e.target.value),
                                    },
                                }))
                            }}
                            className={styles.select_element}
                            type="datetime-local"
                        />
                    </fieldset>

                    <TaskEditor
                        editorRef={editorRef}
                        initialContent={modalData.data.description}
                    />

                    <button className={styles.btnSubmit} type={"submit"}>
                        Сохранить
                    </button>
                </form>
            </div>
        </>
    )
}

export default TaskModal
