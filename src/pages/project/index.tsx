import React, { useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { Editor } from "tinymce"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import useMainTaskModalData from "../../hooks/useMainTaskModalData"
import { Status, Comment } from "../../types"
import Modal from "../../components/Modal/Modal"
import Section from "../../components/projectPage/Section/Section"
import Header from "../../components/Header/Header"
import TaskModal from "../../components/Modal/TaskModal/TaskModal"
import { SortType } from "../../types/components"
import styles from "./ProjectPage.module.scss"
import { modifyTask } from "../../redux/reducers/tasks"
import { createComment, modifyComment } from "../../redux/reducers/comments"

export const statuses: Record<Status, string> = {
    queue: "Очередь",
    development: "В работе",
    done: "Готово",
}

const Project = () => {
    // The ref required for the TinyMCE editor
    const editorRef = useRef<Editor>(null)

    const dispatch = useAppDispatch()
    const { projectId } = useParams()
    const project = useAppSelector((state) => state.projects).find(
        (project) => project.id === Number(projectId)
    )
    const tasks = useAppSelector((state) => state.tasks).filter(
        (task) => task.projectId === Number(projectId)
    )

    // Collecting things required for a modal task window
    const [isModalVisible, setIsModalVisible] = useState(false)
    const {
        modalData,
        setModalData,
        onSubmit,
        closeModal,
        deleteCurrentTask,
        setSelectedTask,
        selectedTaskId,
        setNewTaskStatus,
    } = useMainTaskModalData(project, editorRef, setIsModalVisible)

    const [searchQuery, setSearchQuery] = useState("")
    const [sortType, setSortType] = useState<SortType>("idDown")

    // Generating tasks sections
    const sections = []
    for (let [id, name] of Object.entries(statuses)) {
        sections.push(
            <Section
                key={id}
                id={id as Status}
                name={name}
                tasks={tasks}
                setIsModalVisible={setIsModalVisible}
                setNewTaskStatus={setNewTaskStatus}
                setSelectedTask={setSelectedTask}
                searchQuery={searchQuery}
                sortType={sortType}
            />
        )
    }

    // Defines the behavior of the task when dragging is completed.
    const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
        if (!destination) return

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        )
            return

        const draggedTask = tasks.find(
            (task) => task.id === Number(draggableId)
        )

        dispatch(
            modifyTask({
                taskId: Number(draggableId),
                newTask: {
                    ...draggedTask,
                    status: destination.droppableId as Status,
                },
            })
        )
    }

    return (
        <main className={styles.main}>
            <Header
                backTo={"/"}
                project={project}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <h1 className={styles.main_label}>{project.label}</h1>
            <label className={styles.main_sort}>
                Сортировать по
                <select
                    className={styles.main_sort_select}
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value as SortType)}
                >
                    <option value="idDown">Сначала новые</option>
                    <option value="idUp">Сначала старые</option>
                    <option value="label">По названию</option>
                    <option value="priority">По приоритету</option>
                    <option value="custom">Без сортировки</option>
                </select>
            </label>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className={styles.main_board}>{sections}</div>
            </DragDropContext>

            <Modal isVisible={isModalVisible} closeModal={closeModal}>
                <TaskModal
                    projectId={project.id}
                    mainModalData={modalData}
                    setMainModalData={setModalData}
                    mainEditorRef={editorRef}
                    onMainSubmit={onSubmit}
                    deleteMainTask={deleteCurrentTask}
                    closeMainModal={closeModal}
                    selectedMainTaskId={selectedTaskId}
                    submitComment={(comment: Comment, type: string) => {
                        if (type === "new")
                            dispatch(createComment({ newComment: comment }))
                        else
                            dispatch(
                                modifyComment({
                                    commentId: comment.id,
                                    newComment: comment,
                                })
                            )
                    }}
                />
            </Modal>
        </main>
    )
}

export default Project
