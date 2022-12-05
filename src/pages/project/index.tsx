import React, { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import dayjs, { Dayjs } from "dayjs"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import Modal from "../../components/Modal/Modal"
import { Priority, Status, Task, CommentsList, Comment } from "../../types"
import Section from "../../components/projectPage/Section/Section"
import styles from "./ProjectPage.module.scss"
import Header from "../../components/Header/Header"
import TaskModal from "../../components/Modal/TaskModal/TaskModal"
import { getNextId } from "../../utils/getNextId"
import {
    createComment,
    createTask,
    deleteTask,
    modifyComment,
    modifyTask,
} from "../../redux/actions"
import { Editor } from "tinymce"

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
}

const Project = (): JSX.Element => {
    const dispatch = useAppDispatch()
    const editorRef = useRef<Editor>(null)
    const { projectId } = useParams()
    const project = useAppSelector((state) => state.projects[Number(projectId)])

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
                files: [],
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
                files: [],
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
                project={project}
                setIsModalVisible={setIsModalVisible}
                setNewTaskStatus={setNewTaskStatus}
                setSelectedTask={setSelectedTask}
            />
        )
    }

    return (
        <main className={styles.main}>
            <Header label={"Проект"} backTo={"/"} project={project} />
            <h1 className={styles.label}>{project.label}</h1>

            <DndProvider debugMode={true} backend={HTML5Backend}>
                <div className={styles.board}>{sections}</div>
            </DndProvider>

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
