import React, { useState } from "react"
import styles from "./OptionsBtn.module.scss"
import Modal from "../../Modal/Modal"
import ProjectModal from "../../Modal/ProjectModal/ProjectModal"
import { useAppDispatch } from "../../../hooks/redux"
import { Project } from "../../../types"
import ProjectFeaturesModal, {
    TasksStats,
} from "../../Modal/ProjectFeaturesModal/ProjectFeaturesModal"
import DeleteProjectModal from "../../Modal/DeleteProjectModal/DeleteProjectModal"
import OptionsModal from "../../Modal/OptionsModal/OptionsModal"

type OptionsBtnProps = {
    isOptionsVisible: boolean
    setIsOptionsVisible: React.Dispatch<React.SetStateAction<boolean>>
    project: Project
}

const OptionsBtn = ({
    isOptionsVisible,
    setIsOptionsVisible,
    project,
}: OptionsBtnProps) => {
    const dispatch = useAppDispatch()
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
    const [isModifyModalVisible, setIsModifyModalVisible] = useState(false)
    const [isFeaturesModalVisible, setIsFeaturesModalVisible] = useState(false)

    const closeModalDelete = () => {
        setIsOptionsVisible(false)
        setIsDeleteModalVisible(false)
    }
    const closeModalModify = () => {
        setIsOptionsVisible(false)
        setIsModifyModalVisible(false)
    }
    const closeModalFeatures = () => {
        setIsOptionsVisible(false)
        setIsFeaturesModalVisible(false)
    }

    const projectTasks: TasksStats = {
        amountAll: Object.keys(project.tasks).length,
        amountQueue: Object.values(project.tasks).reduce((sum, task) => {
            return task.status === "queue" ? sum + 1 : sum
        }, 0),
        amountDevelopment: Object.values(project.tasks).reduce((sum, task) => {
            return task.status === "development" ? sum + 1 : sum
        }, 0),
        amountDone: Object.values(project.tasks).reduce((sum, task) => {
            return task.status === "done" ? sum + 1 : sum
        }, 0),
    }

    return (
        <>
            <button
                className={styles.btn}
                onClick={(e) => {
                    e.stopPropagation()
                    setIsOptionsVisible((prev) => !prev)
                }}
            >
                <p>&equiv;</p>
            </button>
            <Modal
                isVisible={isOptionsVisible}
                closeModal={() => setIsOptionsVisible(false)}
            >
                <OptionsModal
                    setIsOptionsVisible={setIsOptionsVisible}
                    setIsDeleteModalVisible={setIsDeleteModalVisible}
                    setIsModifyModalVisible={setIsModifyModalVisible}
                    setIsFeaturesModalVisible={setIsFeaturesModalVisible}
                />
            </Modal>

            <Modal
                isVisible={isModifyModalVisible}
                closeModal={closeModalModify}
            >
                <ProjectModal
                    closeModal={closeModalModify}
                    label={project.label}
                    dispatch={dispatch}
                    id={project.id}
                />
            </Modal>
            <Modal
                isVisible={isFeaturesModalVisible}
                closeModal={closeModalFeatures}
            >
                <ProjectFeaturesModal
                    closeModal={closeModalFeatures}
                    label={project.label}
                    createdAt={project.createdAt}
                    tasksStats={projectTasks}
                />
            </Modal>
            <Modal
                isVisible={isDeleteModalVisible}
                closeModal={closeModalDelete}
            >
                <DeleteProjectModal
                    closeModal={closeModalDelete}
                    label={project.label}
                    id={project.id}
                    tasksAmount={projectTasks.amountAll}
                />
            </Modal>
        </>
    )
}

export default OptionsBtn
