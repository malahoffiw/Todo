import React, { useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { DragDropContext } from "react-beautiful-dnd"
import { Editor } from "tinymce"
import useMainTaskModalData from "../../hooks/useMainTaskModalData"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { createComment, modifyComment } from "../../redux/reducers/comments"
import { sortTasks } from "../../redux/reducers/tasks"
import { Status, Comment } from "../../types"
import { SortType } from "../../types/components"
import Modal from "../../components/Modal/Modal"
import Section from "../../components/projectPage/Section/Section"
import Header from "../../components/Header/Header"
import TaskModal from "../../components/Modal/TaskModal/TaskModal"
import { getProjectTasks } from "../../utils/getProjectTasks"
import onDragEnd from "../../utils/dnd/tasks/onDragEnd"
import styles from "./ProjectPage.module.scss"

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
    const tasks = useAppSelector((state) => state.tasks)
    const projectTasks = getProjectTasks(tasks, Number(projectId))

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
    const [sortType, setSortType] = useState<SortType>("custom")

    // Generating tasks sections
    const sections = []
    for (let [id, name] of Object.entries(statuses)) {
        sections.push(
            <Section
                key={id}
                id={id as Status}
                name={name}
                tasks={projectTasks[id as Status]}
                setIsModalVisible={setIsModalVisible}
                setNewTaskStatus={setNewTaskStatus}
                setSelectedTask={setSelectedTask}
                searchQuery={searchQuery}
            />
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
                    onChange={(e) => {
                        setSortType(e.target.value as SortType)
                        dispatch(
                            sortTasks({ sortType: e.target.value as SortType })
                        )
                    }}
                >
                    <option value="idDown">Сначала новые</option>
                    <option value="idUp">Сначала старые</option>
                    <option value="label">По названию</option>
                    <option value="priority">По приоритету</option>
                    <option value="custom">Без сортировки</option>
                </select>
            </label>

            <DragDropContext
                onDragEnd={(result) => {
                    setSortType("custom")
                    onDragEnd(result, projectTasks, dispatch)
                }}
            >
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
