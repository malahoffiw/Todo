import React, { useRef, useState } from "react"
import dayjs from "dayjs"
import { Editor } from "tinymce"
import { IMeta } from "react-dropzone-uploader"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { MainTaskModalData } from "../../../hooks/useMainTaskModalData"
import { modifySubTask } from "../../../redux/actions"
import { useAppDispatch } from "../../../hooks/redux"
import useSubTaskModalData from "../../../hooks/useSubTaskModalData"
import { Priority, Comment, Status } from "../../../types"
import TaskEditor from "../../projectPage/TaskEditor/TaskEditor"
import Modal from "../Modal"
import CommentsModal from "../CommentsModal/CommentsModal"
import DropzoneModal from "../DropzoneModal/DropzoneModal"
import DeleteModal from "../DeleteModal/DeleteModal"
import SubSection from "./SubSection/SubSection"
import SubTaskModal from "./SubTaskModal"
import { statuses } from "../../../pages/project"
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
    const dispatch = useAppDispatch()
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
    const closeDeleteModal = () => setIsDeleteModalVisible(false)
    const openDeleteModal = () => setIsDeleteModalVisible(true)

    const [isCommentsModalVisible, setIsCommentsModalVisible] = useState(false)
    const closeCommentsModal = () => setIsCommentsModalVisible(false)
    const openCommentsModal = () => setIsCommentsModalVisible(true)

    const [isFilesModalVisible, setIsFilesModalVisible] = useState(false)
    const closeFilesModal = () => setIsFilesModalVisible(false)
    const opesFilesModal = () => setIsFilesModalVisible(true)

    const [isSubTaskModalVisible, setIsSubTaskModalVisible] = useState(false)

    const subTaskEditorRef = useRef<Editor>(null)
    const {
        modalData,
        setModalData,
        onSubmit,
        closeModal,
        deleteCurrentTask,
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

    const subSections = []
    for (let [id, name] of Object.entries(statuses)) {
        subSections.push(
            <SubSection
                key={id}
                id={id as Status}
                name={name}
                subtasks={mainModalData.data.subtasks}
                setIsSubTaskModalVisible={setIsSubTaskModalVisible}
                setNewTaskStatus={setNewTaskStatus}
                setSelectedSubTask={setSelectedSubTask}
            />
        )
    }

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result

        if (!destination) return

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        )
            return

        const draggedSubTask = mainModalData.data.subtasks[Number(draggableId)]
        draggedSubTask.status = destination.droppableId as Status

        dispatch(modifySubTask(projectId, selectedMainTaskId, draggedSubTask))
    }

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
                        projectId={projectId}
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
                        deleteSubTask={deleteCurrentTask}
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
                {mainModalData.type === "existing" ? (
                    <div className={styles.header}>
                        <button
                            className={styles.header_btn}
                            onClick={closeMainModal}
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
                            onClick={closeMainModal}
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
                        autoFocus={true}
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

                    <div className={styles.features}>
                        {mainModalData.type === "existing" && (
                            <DragDropContext onDragEnd={onDragEnd}>
                                <fieldset className={styles.features_subtasks}>
                                    <legend
                                        className={
                                            styles.features_subtasks_legend
                                        }
                                    >
                                        Подзадачи
                                    </legend>

                                    {subSections}
                                </fieldset>
                            </DragDropContext>
                        )}
                        <fieldset className={styles.features_files}>
                            <legend className={styles.features_files_legend}>
                                Вложенные файлы
                            </legend>

                            <ul
                                className={`${
                                    mainModalData.type === "new"
                                        ? styles.features_files_withoutSubTasks
                                        : ""
                                } ${styles.features_files_list}`}
                            >
                                {mainModalData.data.files.map((file) => (
                                    <li
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
                                    </li>
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
