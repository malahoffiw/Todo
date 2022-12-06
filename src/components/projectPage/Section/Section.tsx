import React from "react"
import { Droppable } from "react-beautiful-dnd"
import { Status, Task, TasksList } from "../../../types"
import TaskCard from "../TaskCard/TaskCard"
import styles from "./Section.module.scss"
import { SortType } from "../../../pages/project"

type SectionProps = {
    id: Status
    name: string
    tasks: TasksList
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    setNewTaskStatus: React.Dispatch<React.SetStateAction<Status>>
    setSelectedTask: React.Dispatch<React.SetStateAction<Task>>
    searchQuery: string
    sortType: SortType
}

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
    const sortTasks = (a: Task, b: Task) => {
        if (sortType === "idDown") return b.id - a.id
        if (sortType === "idUp") return a.id - b.id
        if (sortType === "label") return ("" + a.label).localeCompare(b.label)
        if (sortType === "priority") {
            let first
            if (a.priority === "high") first = 2
            if (a.priority === "regular") first = 1
            if (a.priority === "low") first = 0
            let second
            if (b.priority === "high") second = 2
            if (b.priority === "regular") second = 1
            if (b.priority === "low") second = 0

            return second - first
        }
    }

    const doesTaskMatchQuery = (task: Task, query: string) =>
        task.label.toLowerCase().includes(query.toLowerCase()) ||
        String(task.id) === query

    const generateTasks = (status: Status) =>
        Object.values(tasks)
            .filter(
                (task) =>
                    doesTaskMatchQuery(task, searchQuery) &&
                    task.status === status
            )
            .sort(sortTasks)
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
