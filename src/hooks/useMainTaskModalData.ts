import React, { useEffect, useState } from "react"
import dayjs from "dayjs"
import { Editor } from "tinymce"
import { useAppDispatch } from "./redux"
import { createTask, deleteTask, modifyTask } from "../redux/actions"
import { Project, Status, Task } from "../types"
import { getNextId } from "../utils/getNextId"

export type TaskModalContent = Omit<Task, "id" | "createdAt" | "status">
export type MainTaskModalData = {
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
    subtasks: {},
}

const useMainTaskModalData = (
    project: Project,
    editorRef: React.MutableRefObject<Editor>,
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const dispatch = useAppDispatch()
    const [newTaskStatus, setNewTaskStatus] = useState<Status>("queue")
    const [selectedTask, setSelectedTask] = useState<Task>(null)
    const [selectedTaskId, setSelectedTaskId] = useState(0)

    const [modalData, setModalData] = useState<MainTaskModalData>({
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
                    subtasks: selectedTask.subtasks,
                },
            })
            setSelectedTaskId(selectedTask.id)
        }
    }, [selectedTask])

    const closeModal = () => {
        setSelectedTask(null)
        setModalData({
            type: "new",
            data: initialModalContent,
        })
        setIsModalVisible(false)
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let id: number
        let status: Status

        if (modalData.type === "new") {
            id = getNextId(project.tasks)
            status = newTaskStatus
        } else {
            id = selectedTask.id
            status = selectedTask.status
        }

        const newTask = {
            id: id,
            status: status,
            label: modalData.data.label,
            description: editorRef.current.getContent(),
            createdAt: dayjs(),
            expiresAt: modalData.data.expiresAt || undefined,
            priority: modalData.data.priority,
            comments: modalData.data.comments,
            files: modalData.data.files,
            subtasks: modalData.data.subtasks,
        }

        if (modalData.type === "new") {
            dispatch(createTask(project.id, newTask))
        } else {
            dispatch(modifyTask(project.id, newTask))
        }

        closeModal()
    }

    const deleteCurrentTask = () => {
        setSelectedTaskId(0)
        dispatch(deleteTask(project.id, selectedTask.id))
    }

    return {
        modalData,
        setModalData,
        onSubmit,
        closeModal,
        deleteCurrentTask,
        selectedTask,
        setSelectedTask,
        selectedTaskId,
        setNewTaskStatus,
    }
}

export default useMainTaskModalData
