import React, { useRef, useState } from "react"
import dayjs from "dayjs"
import { Editor } from "tinymce"
import { IMeta } from "react-dropzone-uploader"
import useSubTaskModalData from "../../../hooks/useSubTaskModalData"
import { Priority, Comment } from "../../../types"
import TaskEditor from "../../projectPage/TaskEditor/TaskEditor"
import Modal from "../Modal"
import CommentsModal from "./CommentsModal/CommentsModal"
import DropzoneModal from "./DropzoneModal/DropzoneModal"
import DeleteModal from "../DeleteModal/DeleteModal"
import SubTaskModal from "./SubTaskModal/SubTaskModal"
import TaskModalFeatures from "./TaskModalFeatures/TaskModalFeatures"
import TaskModalHeader from "./TaskModalHeader/TaskModalHeader"
import { MainTaskModalData } from "../../../types/components"
import styles from "./TaskModal.module.scss"
import "react-dropzone-uploader/dist/styles.css"

type TaskModalProps = {
    projectId: number
    mainModalData?: MainTaskModalData
    setMainModalData?: React.Dispatch<React.SetStateAction<MainTaskModalData>>
    mainEditorRef: React.MutableRefObject<Editor>
    onMainSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    deleteMainTask: () => void
    closeMainModal: () => void
    selectedMainTaskId: number
    submitComment?: (comment: Comment, type: string) => void
}

/**
 * Modal window to create and manage tasks.
 *
 */
const TaskModal = ({
    projectId,
    mainModalData,
    setMainModalData,
    mainEditorRef,
    onMainSubmit,
    deleteMainTask,
    closeMainModal,
    selectedMainTaskId,
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
    const openFilesModal = () => setIsFilesModalVisible(true)

    const [isSubTaskModalVisible, setIsSubTaskModalVisible] = useState(false)

    const subTaskEditorRef = useRef<Editor>(null)
    const {
        modalData,
        setModalData,
        onSubmit,
        closeModal,
        deleteCurrentSubtask,
        setSelectedSubTask,
        setNewTaskStatus,
    } = useSubTaskModalData(
        projectId,
        selectedMainTaskId,
        mainModalData,
        setMainModalData,
        subTaskEditorRef,
        setIsSubTaskModalVisible
    )

    return (
        <>
            <Modal
                isVisible={isDeleteModalVisible}
                closeModal={closeDeleteModal}
            >
                <DeleteModal
                    label={`Вы уверены, что хотите удалить задачу?`}
                    deleteItem={() => {
                        deleteMainTask()
                        closeMainModal()
                        closeDeleteModal()
                    }}
                    closeModal={closeDeleteModal}
                />
            </Modal>
            {selectedMainTaskId !== 0 && (
                <Modal
                    isVisible={isCommentsModalVisible}
                    closeModal={closeCommentsModal}
                >
                    <CommentsModal
                        closeModal={closeCommentsModal}
                        selectedTaskId={selectedMainTaskId}
                        submitComment={submitComment}
                    />
                </Modal>
            )}
            {selectedMainTaskId !== 0 && (
                <Modal
                    isVisible={isSubTaskModalVisible}
                    closeModal={closeModal}
                >
                    <SubTaskModal
                        modalData={modalData}
                        setModalData={setModalData}
                        closeModal={closeModal}
                        onSubmit={onSubmit}
                        editorRef={subTaskEditorRef}
                        deleteSubTask={deleteCurrentSubtask}
                    />
                </Modal>
            )}
            <Modal isVisible={isFilesModalVisible} closeModal={closeFilesModal}>
                <DropzoneModal
                    closeModal={closeFilesModal}
                    saveFiles={(files: IMeta[]) => {
                        setMainModalData((prev) => ({
                            ...prev,
                            data: {
                                ...prev.data,
                                files: [...prev.data.files, ...files],
                            },
                        }))
                    }}
                />
            </Modal>

            <div
                className={`${styles.back} ${
                    mainModalData.type === "new" ? styles.newTask : ""
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <TaskModalHeader
                    mainModalData={mainModalData}
                    closeMainModal={closeMainModal}
                    openCommentsModal={openCommentsModal}
                    openFilesModal={openFilesModal}
                    openDeleteModal={openDeleteModal}
                />

                <form className={styles.form} onSubmit={onMainSubmit}>
                    <input
                        className={styles.form_input}
                        type="text"
                        value={mainModalData.data.label}
                        onChange={(e) => {
                            setMainModalData((prev) => ({
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
                        autoFocus={false}
                    />
                    <div className={styles.form_fieldsets}>
                        <fieldset className={styles.form_select}>
                            <legend className={styles.form_select_legend}>
                                Приоритет
                            </legend>
                            <select
                                className={styles.form_select_element}
                                value={mainModalData.data.priority}
                                onChange={(e) => {
                                    setMainModalData((prev) => ({
                                        ...prev,
                                        data: {
                                            ...prev.data,
                                            priority: e.target
                                                .value as Priority,
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
                                Дата окончания
                            </legend>
                            <input
                                value={
                                    mainModalData.data.expiresAt
                                        ? mainModalData.data.expiresAt.format(
                                              "YYYY-MM-DD HH:mm"
                                          )
                                        : ""
                                }
                                onChange={(e) => {
                                    setMainModalData((prev) => ({
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
                    </div>

                    <TaskEditor
                        editorRef={mainEditorRef}
                        initialContent={mainModalData.data.description}
                    />

                    <TaskModalFeatures
                        selectedMainTaskId={selectedMainTaskId}
                        mainModalData={mainModalData}
                        setIsSubTaskModalVisible={setIsSubTaskModalVisible}
                        setNewTaskStatus={setNewTaskStatus}
                        setSelectedSubTask={setSelectedSubTask}
                    />

                    <button className={styles.form_btn} type={"submit"}>
                        Сохранить
                    </button>
                </form>
            </div>
        </>
    )
}

export default TaskModal
