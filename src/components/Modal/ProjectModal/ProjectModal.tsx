import React, { useState } from "react"
import { Dispatch } from "redux"
import { createProject, modifyProject } from "../../../redux/actions"
import styles from "./ProjectModal.module.scss"

type ProjectModalProps = {
    dispatch: Dispatch
    closeModal: () => void
    label: string
    id?: number
}

const ProjectModal = ({
    dispatch,
    closeModal,
    label,
    id,
}: ProjectModalProps) => {
    const [newProjectLabel, setNewProjectLabel] = useState(label)

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!label) {
            dispatch(createProject(newProjectLabel))
            setNewProjectLabel("")
        } else {
            dispatch(modifyProject(id, newProjectLabel))
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
                    autoFocus={true}
                />
                <button className={styles.form_btn} type="submit">
                    {!label ? "Создать" : "Сохранить"}
                </button>
            </form>
        </div>
    )
}

export default ProjectModal
