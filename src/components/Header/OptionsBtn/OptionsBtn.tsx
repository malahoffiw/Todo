import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { Project } from "../../../types"
import Modal from "../../Modal/Modal"
import ProjectModal from "../../Modal/ProjectModal/ProjectModal"
import ProjectPropertiesModal from "../../Modal/ProjectPropertiesModal/ProjectPropertiesModal"
import OptionsModal from "../../Modal/OptionsModal/OptionsModal"
import DeleteModal from "../../Modal/DeleteModal/DeleteModal"
import styles from "./OptionsBtn.module.scss"
import { deleteProject } from "../../../redux/reducers/projects"

type OptionsBtnProps = {
    isOptionsVisible: boolean
    setIsOptionsVisible: React.Dispatch<React.SetStateAction<boolean>>
    project: Project
}

/**
 * The options button displayed on the right in the header.
 *
 */
const OptionsBtn = ({
    isOptionsVisible,
    setIsOptionsVisible,
    project,
}: OptionsBtnProps) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const projectTasks = useAppSelector((state) => state.tasks).filter(
        (task) => task.projectId === project.id
    )

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
    const [isModifyModalVisible, setIsModifyModalVisible] = useState(false)
    const [isFeaturesModalVisible, setIsFeaturesModalVisible] = useState(false)

    const closeModalDelete = () => {
        setIsDeleteModalVisible(false)
    }
    const closeModalModify = () => {
        setIsModifyModalVisible(false)
    }
    const closeModalFeatures = () => {
        setIsFeaturesModalVisible(false)
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
                    id={project.id}
                />
            </Modal>
            <Modal
                isVisible={isFeaturesModalVisible}
                closeModal={closeModalFeatures}
            >
                <ProjectPropertiesModal
                    closeModal={closeModalFeatures}
                    project={project}
                />
            </Modal>
            <Modal
                isVisible={isDeleteModalVisible}
                closeModal={closeModalDelete}
            >
                <DeleteModal
                    label={`Вы уверены, что хотите удалить проект ${project.label}?`}
                    submessage={`Действие приведет к удалению всех (${projectTasks.length}) задач проекта`}
                    deleteItem={() => {
                        dispatch(deleteProject({ projectId: project.id }))
                        navigate("/")
                    }}
                    closeModal={closeModalDelete}
                />
            </Modal>
        </>
    )
}

export default OptionsBtn
