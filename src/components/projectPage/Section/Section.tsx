import React from "react"
import { Droppable } from "react-beautiful-dnd"
import { Status, Task } from "../../../types"
import { SortType } from "../../../types/components"
import sortTasks from "../../../utils/Section/sortTasks"
import doesTaskMatchQuery from "../../../utils/Section/doesTaskMatchQuery"
import TaskCard from "./TaskCard/TaskCard"
import styles from "./Section.module.scss"

type SectionProps = {
    id: Status
    name: string
    tasks: Task[]
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    setNewTaskStatus: React.Dispatch<React.SetStateAction<Status>>
    setSelectedTask: React.Dispatch<React.SetStateAction<Task>>
    searchQuery: string
    sortType: SortType
}

/**
 * Section with tasks displayed at the selected Project page.
 *
 */
const Section = ({
    id,
    name,
    tasks,
    setIsModalVisible,
    setNewTaskStatus,
    setSelectedTask,
    searchQuery,
    sortType,
}: SectionProps) => {
    const generateTasks = (status: Status) =>
        tasks
            .filter(
                (task) =>
                    doesTaskMatchQuery(task, searchQuery) &&
                    task.status === status
            )
            .sort(sortTasks(sortType))
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

    return (
        <section className={styles.section}>
            <p className={`${styles.section_label} ${styles[id]}`}>{name}</p>
            <button
                onClick={() => {
                    setNewTaskStatus(id)
                    setIsModalVisible(true)
                }}
                className={styles.section_newTask}
            >
                <p className={styles.section_newTask_plus}>+</p>
            </button>

            <Droppable droppableId={id}>
                {(provided) => (
                    <ul
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={styles.section_taskList}
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
