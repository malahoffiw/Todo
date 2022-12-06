import React from "react"
import { Droppable } from "react-beautiful-dnd"
import { Status, SubTask, SubTasksList } from "../../../../types"
import SubTaskCard from "../SubTaskCard/SubTaskCard"
import styles from "./SubSection.module.scss"

type SubSectionProps = {
    id: Status
    name: string
    subtasks: SubTasksList
    setIsSubTaskModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    setNewTaskStatus: React.Dispatch<React.SetStateAction<Status>>
    setSelectedSubTask: React.Dispatch<React.SetStateAction<SubTask>>
}

const SubSection = ({
    id,
    name,
    subtasks,
    setIsSubTaskModalVisible,
    setNewTaskStatus,
    setSelectedSubTask,
}: SubSectionProps) => {
    const generateSubTasks = (status: Status) =>
        Object.values(subtasks)
            .filter((subtask) => subtask.status === status)
            .map((subtask, index) => (
                <SubTaskCard
                    key={subtask.id}
                    subtask={subtask}
                    index={index}
                    onClick={() => {
                        setSelectedSubTask(subtask)
                        setIsSubTaskModalVisible(true)
                    }}
                />
            ))

    return (
        <div className={styles.section}>
            <p className={`${styles.section_label} ${styles[id]}`}>{name}</p>
            <button
                className={styles.section_newTask}
                onClick={(e) => {
                    e.preventDefault()
                    setNewTaskStatus(id)
                    setIsSubTaskModalVisible(true)
                }}
            >
                <p className={styles.section_newTask_plus}>+</p>
            </button>
            <Droppable droppableId={id} direction="horizontal">
                {(provided) => (
                    <ul
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={styles.section_taskList}
                    >
                        {generateSubTasks(id)}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </div>
    )
}

export default SubSection
