import React from "react"
import styles from "./OptionsModal.module.scss"

type OptionsModalProps = {
    setIsOptionsVisible: React.Dispatch<React.SetStateAction<boolean>>
    setIsDeleteModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    setIsModifyModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    setIsFeaturesModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const OptionsModal = ({
    setIsOptionsVisible,
    setIsDeleteModalVisible,
    setIsModifyModalVisible,
    setIsFeaturesModalVisible,
}: OptionsModalProps) => {
    return (
        <div className={styles.back} onClick={(e) => e.stopPropagation()}>
            <div className={styles.header}>
                <p className={styles.label}>Действия</p>
                <button
                    className={styles.btn}
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
                    Удалить
                </li>
                <li
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsModifyModalVisible(true)
                    }}
                    className={styles.list_option}
                >
                    Переименовать
                </li>
                <li
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsFeaturesModalVisible(true)
                    }}
                    className={styles.list_option}
                >
                    Свойства
                </li>
            </ul>
        </div>
    )
}

export default OptionsModal
