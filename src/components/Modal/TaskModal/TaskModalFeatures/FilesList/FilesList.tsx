import React from "react"
import { MainTaskModalData } from "../../../../../types/components"
import styles from "./FilesList.module.scss"

type FilesListProps = {
    mainModalData: MainTaskModalData
}

/**
 * Section with data of files uploaded to selected Task Modal Data
 *
 */
const FilesList = ({ mainModalData }: FilesListProps) => {
    return (
        <fieldset className={styles.files}>
            <legend className={styles.files_legend}>Вложенные файлы</legend>

            <ul
                className={`${
                    mainModalData.type === "new"
                        ? styles.files_withoutSubTasks
                        : ""
                } ${styles.files_list}`}
            >
                {mainModalData.data.files.map((file) => (
                    <li className={styles.files_list_item} key={file.id}>
                        {file.name.length > 20
                            ? `${file.name.split(".")[0].slice(0, 15)}...${
                                  file.name.split(".")[1]
                              }`
                            : file.name}
                    </li>
                ))}
            </ul>
        </fieldset>
    )
}

export default FilesList
