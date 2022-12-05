import React from "react"
import { Droppable } from "react-beautiful-dnd"
import { Status, Task, TasksList } from "../../../types"
import TaskCard from "../TaskCard/TaskCard"
import styles from "./Section.module.scss"

type SectionProps = {
    id: Status
    name: string
    tasks: TasksList
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    setNewTaskStatus: React.Dispatch<React.SetStateAction<Status>>
    setSelectedTask: React.Dispatch<React.SetStateAction<Task>>
}

const Section = ({
    id,
    name,
    tasks,
    setIsModalVisible,
    setNewTaskStatus,
    setSelectedTask,
}: SectionProps) => {
    const generateTasks = (status: Status) => {
        return Object.values(tasks)
            .filter((task) => task.status === status)
            .map((task, index) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    index={index}
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
            <Droppable droppableId={id}>
                {(provided) => (
                    <ul
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={styles.taskList}
                    >
                        {generateTasks(id)}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </section>
    )
}

export default Section
