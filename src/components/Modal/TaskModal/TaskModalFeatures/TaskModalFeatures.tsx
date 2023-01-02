import React from "react"
import { DragDropContext } from "react-beautiful-dnd"
import { Status, SubTask } from "../../../../types"
import { MainTaskModalData } from "../../../../types/components"
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { statuses } from "../../../../pages/project"
import SubSection from "./SubSection/SubSection"
import FilesList from "./FilesList/FilesList"
import { getTaskSubtasks } from "../../../../utils/getTaskSubtasks"
import onDragEnd from "../../../../utils/dnd/subtasks/onDragEnd"
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
    const subtasks = useAppSelector((state) => state.subtasks)
    const taskSubtasks = getTaskSubtasks(subtasks, selectedMainTaskId)

    const subSections = []
    for (let [id, name] of Object.entries(statuses)) {
        subSections.push(
            <SubSection
                key={id}
                id={id as Status}
                name={name}
                subtasks={taskSubtasks[id as Status]}
                setIsSubTaskModalVisible={setIsSubTaskModalVisible}
                setNewTaskStatus={setNewTaskStatus}
                setSelectedSubTask={setSelectedSubTask}
            />
        )
    }

    return (
        <div className={styles.features}>
            {mainModalData.type === "existing" && (
                <DragDropContext
                    onDragEnd={(result) =>
                        onDragEnd(result, taskSubtasks, dispatch)
                    }
                >
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
