import React from "react"
import { Project, Status, Task } from "../../../types"
import TaskCard, { DropSection } from "../TaskCard/TaskCard"
import styles from "./Section.module.scss"
import { useDrop } from "react-dnd"
import { ItemTypes } from "../../../dndTypes"

type SectionProps = {
    id: Status
    name: string
    project: Project
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    setNewTaskStatus: React.Dispatch<React.SetStateAction<Status>>
    setSelectedTask: React.Dispatch<React.SetStateAction<Task>>
}

const Section = ({
    id,
    name,
    project,
    setIsModalVisible,
    setNewTaskStatus,
    setSelectedTask,
}: SectionProps) => {
    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: ItemTypes.CARD,
            drop: (): DropSection => ({ project, status: id }),
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
            }),
        }),
        [id]
    )

    const generateTasks = (status: Status) => {
        return Object.values(project.tasks)
            .filter((task) => task.status === status)
            .map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => {
                        setSelectedTask(task)
                        setIsModalVisible(true)
                    }}
                />
            ))
    }

    return (
        <section key={id} className={styles.section}>
            <p className={`${styles.sectionLabel} ${styles[id]}`}>{name}</p>
            <div
                onClick={() => {
                    setNewTaskStatus(id)
                    setIsModalVisible(true)
                }}
                className={styles.newTask}
            >
                <p className={styles.plus}>+</p>
            </div>
            <ul ref={drop} className={styles.taskList}>
                {generateTasks(id)}
                {isOver && (
                    <div
                        style={{
                            height: "100%",
                            width: "100%",
                            zIndex: 1,
                            opacity: 0.5,
                            backgroundColor: "gray",
                        }}
                    />
                )}
            </ul>
        </section>
    )
}

export default Section
