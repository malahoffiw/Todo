import React from "react"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { Status, SubTask } from "../../../../types"
import { MainTaskModalData } from "../../../../types/components"
import { modifySubTask } from "../../../../redux/reducers/subtasks"
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { statuses } from "../../../../pages/project"
import SubSection from "./SubSection/SubSection"
import FilesList from "./FilesList/FilesList"
import styles from "./TaskModalFeatures.module.scss"

type TaskModalFeaturesProps = {
    selectedMainTaskId: number
    mainModalData: MainTaskModalData
    setIsSubTaskModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    setNewTaskStatus: React.Dispatch<React.SetStateAction<Status>>
    setSelectedSubTask: React.Dispatch<React.SetStateAction<SubTask>>
}

/**
 * Small section in Task Modal window contains SubSection and FilesList
 *
 */
const TaskModalFeatures = ({
    selectedMainTaskId,
    mainModalData,
    setIsSubTaskModalVisible,
    setNewTaskStatus,
    setSelectedSubTask,
}: TaskModalFeaturesProps) => {
    const dispatch = useAppDispatch()
    const subtasks = useAppSelector((state) => state.subtasks).filter(
        (subtask) => subtask.taskId === selectedMainTaskId
    )

    const subSections = []
    for (let [id, name] of Object.entries(statuses)) {
        subSections.push(
            <SubSection
                key={id}
                id={id as Status}
                name={name}
                subtasks={subtasks}
                setIsSubTaskModalVisible={setIsSubTaskModalVisible}
                setNewTaskStatus={setNewTaskStatus}
                setSelectedSubTask={setSelectedSubTask}
            />
        )
    }

    const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
        if (!destination) return

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        )
            return

        const draggedSubTask = subtasks.find(
            (subtask) => subtask.id === Number(draggableId)
        )

        dispatch(
            modifySubTask({
                subtaskId: draggedSubTask.id,
                newSubtask: {
                    ...draggedSubTask,
                    status: destination.droppableId as Status,
                },
            })
        )
    }

    return (
        <div className={styles.features}>
            {mainModalData.type === "existing" && (
                <DragDropContext onDragEnd={onDragEnd}>
                    <fieldset className={styles.features_subtasks}>
                        <legend className={styles.features_subtasks_legend}>
                            Подзадачи
                        </legend>

                        {subSections}
                    </fieldset>
                </DragDropContext>
            )}

            <FilesList mainModalData={mainModalData} />
        </div>
    )
}

export default TaskModalFeatures
