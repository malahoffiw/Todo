import React, { useState } from "react"
import styles from "./ProjectModal.module.scss"
import { createProject, modifyProject } from "../../../redux/reducers/projects"
import { useAppDispatch } from "../../../hooks/redux"

type ProjectModalProps = {
    closeModal: () => void
    label: string
    id?: number
}

/**
 * Modal window to create and rename project.
 *
 */
const ProjectModal = ({ closeModal, label, id }: ProjectModalProps) => {
    const dispatch = useAppDispatch()
    const [newProjectLabel, setNewProjectLabel] = useState(label)

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!label) {
            dispatch(createProject({ projectLabel: newProjectLabel }))
            setNewProjectLabel("")
        } else {
            dispatch(
                modifyProject({ projectId: id, projectLabel: newProjectLabel })
            )
        }
        closeModal()
    }

    return (
        <div className={styles.back} onClick={(e) => e.stopPropagation()}>
            <p className={styles.label}>{!label ? "Новый проект" : "Проект"}</p>
            <form className={styles.form} onSubmit={onSubmit}>
                <input
                    className={styles.form_input}
                    type="text"
                    value={newProjectLabel}
                    onChange={(e) => setNewProjectLabel(e.target.value)}
                    required
                    maxLength={20}
                    placeholder="Название"
                    autoFocus={false}
                />
                <button className={styles.form_btn} type="submit">
                    {!label ? "Создать" : "Сохранить"}
                </button>
            </form>
        </div>
    )
}

export default ProjectModal
