import React, { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import dayjs, { Dayjs } from "dayjs"
import { Editor } from "tinymce"
import { IMeta } from "react-dropzone-uploader"
import {
    createComment,
    createTask,
    deleteTask,
    modifyComment,
    modifyTask,
} from "../../redux/actions"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { Priority, Status, Task, CommentsList, Comment } from "../../types"
import Modal from "../../components/Modal/Modal"
import Section from "../../components/projectPage/Section/Section"
import Header from "../../components/Header/Header"
import TaskModal from "../../components/Modal/TaskModal/TaskModal"
import { getNextId } from "../../utils/getNextId"
import styles from "./ProjectPage.module.scss"

const statuses: Record<Status, string> = {
    queue: "Очередь",
    development: "В работе",
    done: "Готово",
}

export type TaskModalContent = {
    label: string
    description: string
    priority: Priority
    expiresAt: Dayjs
    comments: CommentsList
    files: IMeta[]
}

export type ModalData = {
    type: string
    data: TaskModalContent
}

const initialModalContent: TaskModalContent = {
    label: "",
    description: '<p style="text-align: center;">Описание</p><hr/><br/>',
    priority: "regular",
    expiresAt: null,
    comments: {},
    files: [],
}

const Project = (): JSX.Element => {
    const dispatch = useAppDispatch()
    const editorRef = useRef<Editor>(null)
    const { projectId } = useParams()
    const project = useAppSelector((state) => state.projects[Number(projectId)])
    const tasks = useAppSelector(
        (state) => state.projects[Number(projectId)].tasks
    )

    const [isModalVisible, setIsModalVisible] = useState(false)

    const closeModal = () => {
        setSelectedTask(null)
        setModalData({
            type: "new",
            data: initialModalContent,
        })
        setIsModalVisible(false)
    }

    const [newTaskStatus, setNewTaskStatus] = useState<Status>("queue")
    const [selectedTask, setSelectedTask] = useState<Task>(null)
    const [selectedTaskId, setSelectedTaskId] = useState(0)

    const [modalData, setModalData] = useState<ModalData>({
        type: "new",
        data: initialModalContent,
    })

    useEffect(() => {
        if (selectedTask === null) {
            setModalData({
                type: "new",
                data: initialModalContent,
            })
            setSelectedTaskId(0)
        } else {
            setModalData({
                type: "existing",
                data: {
                    label: selectedTask.label,
                    description: selectedTask.description,
                    priority: selectedTask.priority,
                    expiresAt: selectedTask.expiresAt,
                    comments: selectedTask.comments,
                    files: selectedTask.files,
                },
            })
            setSelectedTaskId(selectedTask.id)
        }
    }, [selectedTask])

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let newTask: Task

        if (modalData.type === "new") {
            newTask = {
                id: getNextId(project.tasks),
                status: newTaskStatus,
                label: modalData.data.label,
                description: editorRef.current.getContent(),
                createdAt: dayjs(),
                expiresAt: modalData.data.expiresAt || undefined,
                priority: modalData.data.priority,
                comments: modalData.data.comments,
                files: modalData.data.files,
                subtasks: [],
            }

            dispatch(createTask(project, newTask))
        } else {
            newTask = {
                id: selectedTask.id,
                status: selectedTask.status,
                label: modalData.data.label,
                description: editorRef.current.getContent(),
                createdAt: dayjs(),
                expiresAt: modalData.data.expiresAt || undefined,
                priority: modalData.data.priority,
                comments: modalData.data.comments,
                files: modalData.data.files,
                subtasks: [],
            }

            dispatch(modifyTask(project, newTask))
        }

        closeModal()
    }

    const deleteCurrentTask = () => {
        setSelectedTaskId(0)
        dispatch(deleteTask(project, selectedTask))
    }

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

        const newTask = project.tasks[Number(draggableId)]
        newTask.status = destination.droppableId as Status

        dispatch(modifyTask(project, newTask))
    }

    return (
        <main className={styles.main}>
            <Header label={"Проект"} backTo={"/"} project={project} />
            <h1 className={styles.main_label}>{project.label}</h1>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className={styles.main_board}>{sections}</div>
            </DragDropContext>

            <Modal isVisible={isModalVisible} closeModal={closeModal}>
                <TaskModal
                    projectId={project.id}
                    modalData={modalData}
                    setModalData={setModalData}
                    editorRef={editorRef}
                    onSubmit={onSubmit}
                    deleteTask={deleteCurrentTask}
                    closeTaskModal={closeModal}
                    selectedTaskId={selectedTaskId}
                    submitComment={(comment: Comment, type: string) => {
                        if (type === "new")
                            dispatch(
                                createComment(
                                    project.id,
                                    selectedTask.id,
                                    comment
                                )
                            )
                        else
                            dispatch(
                                modifyComment(
                                    project.id,
                                    selectedTask.id,
                                    comment
                                )
                            )
                    }}
                />
            </Modal>
        </main>
    )
}

export default Project
