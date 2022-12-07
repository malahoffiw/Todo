import React, { useEffect, useState } from "react"
import { Editor } from "tinymce"
import dayjs from "dayjs"
import { useAppDispatch } from "./redux"
import { createSubTask, deleteSubTask, modifySubTask } from "../redux/actions"
import { Status, SubTask } from "../types"
import {
    MainTaskModalData,
    SubTaskModalContent,
    SubTaskModalData,
} from "../types/components"
import { getNextId } from "../utils/getNextId"

const initialModalContent: SubTaskModalContent = {
    label: "",
    description:
        '<p style="text-align: center; font-size: 16px;">Описание</p><hr/><br/>',
    priority: "regular",
    expiresAt: null,
}

/**
 * Allows to receive and update information in the subtask modal window.
 *
 */
const useSubTaskModalData = (
    projectId: number,
    taskId: number,
    mainModalData: MainTaskModalData,
    setMainModalData: React.Dispatch<React.SetStateAction<MainTaskModalData>>,
    editorRef: React.MutableRefObject<Editor>,
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const dispatch = useAppDispatch()
    const [newTaskStatus, setNewTaskStatus] = useState<Status>("queue")
    const [selectedSubTask, setSelectedSubTask] = useState<SubTask>(null)

    const [modalData, setModalData] = useState<SubTaskModalData>({
        type: "new",
        data: initialModalContent,
    })

    useEffect(() => {
        if (selectedSubTask === null) {
            setModalData({
                type: "new",
                data: initialModalContent,
            })
        } else {
            setModalData({
                type: "existing",
                data: {
                    label: selectedSubTask.label,
                    description: selectedSubTask.description,
                    priority: selectedSubTask.priority,
                    expiresAt: selectedSubTask.expiresAt,
                },
            })
        }
    }, [selectedSubTask])

    const closeModal = () => {
        setSelectedSubTask(null)
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
            id = getNextId(mainModalData.data.subtasks)
            status = newTaskStatus
        } else {
            id = selectedSubTask.id
            status = selectedSubTask.status
        }

        const newTask = {
            id: id,
            status: status,
            label: modalData.data.label,
            description: editorRef.current.getContent(),
            createdAt: dayjs(),
            expiresAt: modalData.data.expiresAt || undefined,
            priority: modalData.data.priority,
        }

        if (modalData.type === "new") {
            dispatch(createSubTask(projectId, taskId, newTask))
        } else {
            dispatch(modifySubTask(projectId, taskId, newTask))
        }

        setMainModalData((prev) => ({
            ...prev,
            data: {
                ...prev.data,
                subtasks: {
                    ...prev.data.subtasks,
                    [id]: newTask,
                },
            },
        }))
        closeModal()
    }

    const deleteCurrentTask = () => {
        const { [selectedSubTask.id]: _, ...rest } = mainModalData.data.subtasks
        setMainModalData((prev) => ({
            ...prev,
            data: {
                ...prev.data,
                subtasks: {
                    ...rest,
                },
            },
        }))
        dispatch(deleteSubTask(projectId, taskId, selectedSubTask.id))
    }

    return {
        modalData,
        setModalData,
        onSubmit,
        closeModal,
        deleteCurrentTask,
        setSelectedSubTask,
        setNewTaskStatus,
    }
}

export default useSubTaskModalData
