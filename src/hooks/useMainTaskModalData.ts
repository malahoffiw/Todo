import React, { useEffect, useState } from "react"
import dayjs from "dayjs"
import { Editor } from "tinymce"
import { createTask, deleteTask, modifyTask } from "../redux/reducers/tasks"
import { useAppDispatch, useAppSelector } from "./redux"
import { Project, Status, Task } from "../types"
import { MainTaskModalData, TaskModalContent } from "../types/components"
import { getNextTaskId } from "../utils/getNextId"
import { getProjectTasks } from "../utils/getProjectTasks"

const initialModalContent: TaskModalContent = {
    label: "",
    description:
        '<p style="text-align: center; font-size: 16px;">Описание</p><hr/><br/>',
    priority: "regular",
    expiresAt: null,
    files: [],
}

/**
 * Allows to receive and update information in the task modal window.
 *
 */
const useMainTaskModalData = (
    project: Project,
    editorRef: React.MutableRefObject<Editor>,
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const dispatch = useAppDispatch()
    const tasks = useAppSelector((state) => state.tasks)
    const projectTasks = getProjectTasks(tasks, project.id)

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
                    files: selectedTask.files,
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
            id = getNextTaskId(projectTasks)
            status = newTaskStatus
        } else {
            id = selectedTask.id
            status = selectedTask.status
        }

        const newTask = {
            id: id,
            projectId: project.id,
            status: status,
            label: modalData.data.label,
            description: editorRef.current.getContent(),
            createdAt: dayjs(),
            expiresAt: modalData.data.expiresAt || undefined,
            priority: modalData.data.priority,
            files: modalData.data.files,
        }

        if (modalData.type === "new") {
            dispatch(createTask({ newTask }))
        } else {
            dispatch(modifyTask({ taskId: newTask.id, newTask }))
        }

        closeModal()
    }

    const deleteCurrentTask = () => {
        setSelectedTaskId(0)
        dispatch(
            deleteTask({
                taskStatus: selectedTask.status,
                taskId: selectedTask.id,
            })
        )
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
