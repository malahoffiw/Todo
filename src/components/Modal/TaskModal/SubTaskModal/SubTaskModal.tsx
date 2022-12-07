import React, { useState } from "react"
import dayjs from "dayjs"
import { Editor } from "tinymce"
import { Priority } from "../../../../types"
import { SubTaskModalData } from "../../../../types/components"
import Modal from "../../Modal"
import DeleteModal from "../../DeleteModal/DeleteModal"
import TaskEditor from "../../../projectPage/TaskEditor/TaskEditor"
import SubTaskModalHeader from "./SubTaskModalHeader"
import styles from "../TaskModal.module.scss"

type SubTaskModalProps = {
    modalData: SubTaskModalData
    setModalData: React.Dispatch<React.SetStateAction<SubTaskModalData>>
    closeModal: () => void
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    editorRef: React.MutableRefObject<Editor>
    deleteSubTask: () => void
}

/**
 * Modal window to create and manage subtasks.
 *
 */
const SubTaskModal = ({
    modalData,
    setModalData,
    closeModal,
    onSubmit,
    editorRef,
    deleteSubTask,
}: SubTaskModalProps) => {
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
    const closeDeleteModal = () => setIsDeleteModalVisible(false)
    const openDeleteModal = () => setIsDeleteModalVisible(true)

    return (
        <>
            <Modal
                isVisible={isDeleteModalVisible}
                closeModal={closeDeleteModal}
            >
                <DeleteModal
                    label={`Вы уверены, что хотите удалить подзадачу?`}
                    deleteItem={() => {
                        deleteSubTask()
                        closeModal()
                        closeDeleteModal()
                    }}
                    closeModal={closeDeleteModal}
                />
            </Modal>

            <div
                className={`${styles.back} ${styles.subtask} ${
                    modalData.type === "new" ? styles.newTask : ""
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <SubTaskModalHeader
                    modalData={modalData}
                    closeModal={closeModal}
                    openDeleteModal={openDeleteModal}
                />

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
                    <div className={styles.form_fieldsets}>
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
                    </div>

                    <TaskEditor
                        editorRef={editorRef}
                        initialContent={modalData.data.description}
                    />

                    <button className={styles.form_btn} type={"submit"}>
                        Сохранить
                    </button>
                </form>
            </div>
        </>
    )
}

export default SubTaskModal
