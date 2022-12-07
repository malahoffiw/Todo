import React from "react"
import styles from "./OptionsModal.module.scss"

type OptionsModalProps = {
    setIsOptionsVisible: React.Dispatch<React.SetStateAction<boolean>>
    setIsDeleteModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    setIsModifyModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    setIsFeaturesModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Modal window to display options available for the selected project.
 *
 */
const OptionsModal = ({
    setIsOptionsVisible,
    setIsDeleteModalVisible,
    setIsModifyModalVisible,
    setIsFeaturesModalVisible,
}: OptionsModalProps) => {
    return (
        <div className={styles.back} onClick={(e) => e.stopPropagation()}>
            <div className={styles.header}>
                <p className={styles.header_label}>Действия</p>
                <button
                    className={styles.header_btn}
                    onClick={() => {
                        setIsOptionsVisible(false)
                    }}
                >
                    &#10004;
                </button>
            </div>

            <ul className={styles.list}>
                <li
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsDeleteModalVisible(true)
                    }}
                    className={styles.list_option}
                >
                    <p>Удалить</p>
                </li>
                <li
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsModifyModalVisible(true)
                    }}
                    className={styles.list_option}
                >
                    <p>Переименовать</p>
                </li>
                <li
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsFeaturesModalVisible(true)
                    }}
                    className={styles.list_option}
                >
                    <p>Свойства</p>
                </li>
            </ul>
        </div>
    )
}

export default OptionsModal
