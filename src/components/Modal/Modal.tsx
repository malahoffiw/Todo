import React, { useEffect } from "react"
import styles from "./Modal.module.scss"

type ModalProps = {
    isVisible: boolean
    children: JSX.Element
    closeModal: () => void
}

const Modal = ({ isVisible, closeModal, children }: ModalProps) => {
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeModal()
            }
        }
        window.addEventListener("keydown", onKeyDown)

        return () => window.removeEventListener("keydown", onKeyDown)
    }, [])

    return (
        <div
            className={`
                ${isVisible ? styles.visible : styles.hidden} 
                ${styles.modal}
            `}
            onClick={closeModal}
        >
            {children}
        </div>
    )
}

export default Modal
