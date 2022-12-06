import React, { useState } from "react"
import dayjs from "dayjs"
import { Editor } from "tinymce"
import { IMeta } from "react-dropzone-uploader"
import { Priority, Comment } from "../../../types"
import { ModalData } from "../../../pages/project"
import TaskEditor from "../../projectPage/TaskEditor/TaskEditor"
import Modal from "../Modal"
import CommentsModal from "../CommentsModal/CommentsModal"
import DropzoneModal from "../DropzoneModal/DropzoneModal"
import DeleteModal from "../DeleteModal/DeleteModal"
import styles from "./TaskModal.module.scss"
import "react-dropzone-uploader/dist/styles.css"

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
    const [isFilesModalVisible, setIsFilesModalVisible] = useState(false)
    const closeFilesModal = () => setIsFilesModalVisible(false)
    const opesFilesModal = () => setIsFilesModalVisible(true)

    return (
        <>
            <Modal
                isVisible={isDeleteModalVisible}
                closeModal={closeDeleteModal}
            >
                <DeleteModal
                    label={`Вы уверены, что хотите удалить задачу?`}
                    deleteItem={() => {
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
            <Modal isVisible={isFilesModalVisible} closeModal={closeFilesModal}>
                <DropzoneModal
                    closeModal={closeFilesModal}
                    saveFiles={(files: IMeta[]) => {
                        setModalData((prev) => ({
                            ...prev,
                            data: {
                                ...prev.data,
                                files: [...prev.data.files, ...files],
                            },
                        }))
                    }}
                />
            </Modal>

            <div className={styles.back} onClick={(e) => e.stopPropagation()}>
                {modalData.type === "existing" ? (
                    <div className={styles.header}>
                        <button
                            className={styles.header_btn}
                            onClick={closeTaskModal}
                        >
                            &#10531;
                        </button>
                        <button
                            className={styles.header_btn}
                            onClick={openCommentsModal}
                        >
                            &#128172;
                        </button>

                        <p className={styles.header_label}>Задача</p>
                        <button
                            className={styles.header_btn}
                            onClick={opesFilesModal}
                        >
                            &#128206;
                        </button>
                        <button
                            className={styles.header_btn}
                            onClick={openDeleteModal}
                        >
                            &#128465;
                        </button>
                    </div>
                ) : (
                    <div className={styles.header}>
                        <button
                            className={styles.header_btn}
                            onClick={closeTaskModal}
                        >
                            &#10531;
                        </button>
                        <p className={styles.header_label}>Новая задача</p>
                        <button
                            className={styles.header_btn}
                            onClick={opesFilesModal}
                        >
                            &#128206;
                        </button>
                    </div>
                )}

                <form className={styles.form} onSubmit={onSubmit}>
                    <input
                        className={styles.form_input}
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
                        maxLength={20}
                        placeholder="Название"
                        autoFocus={true}
                    />
                    <fieldset className={styles.form_select}>
                        <legend className={styles.form_select_legend}>
                            Приоритет
                        </legend>
                        <select
                            className={styles.form_select_element}
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

                    <fieldset className={styles.form_select}>
                        <legend className={styles.form_select_legend}>
                            Дата
                        </legend>
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
                            className={styles.form_select_element}
                            type="datetime-local"
                        />
                    </fieldset>

                    <TaskEditor
                        editorRef={editorRef}
                        initialContent={modalData.data.description}
                    />

                    <div className={styles.features}>
                        <fieldset className={styles.features_subtasks}>
                            <legend className={styles.features_subtasks_legend}>
                                Подзадачи
                            </legend>
                        </fieldset>
                        <fieldset className={styles.features_files}>
                            <legend className={styles.features_files_legend}>
                                Вложенные файлы
                            </legend>

                            <ul className={styles.features_files_list}>
                                {modalData.data.files.map((file) => (
                                    <p
                                        className={
                                            styles.features_files_list_item
                                        }
                                        key={file.id}
                                    >
                                        {file.name.length > 20
                                            ? `${file.name
                                                  .split(".")[0]
                                                  .slice(0, 15)}...${
                                                  file.name.split(".")[1]
                                              }`
                                            : file.name}
                                    </p>
                                ))}
                            </ul>
                        </fieldset>
                    </div>

                    <button className={styles.form_btn} type={"submit"}>
                        Сохранить
                    </button>
                </form>
            </div>
        </>
    )
}

export default TaskModal
