import React, { useEffect } from "react"
import styles from "./Modal.module.scss"

type ModalProps = {
    isVisible: boolean
    children: JSX.Element
    closeModal: () => void
}

/**
 * Fullscreen wrapper for each modal window
 *
 */
const Modal = ({ isVisible, closeModal, children }: ModalProps) => {
    // Close modal windows on Esc key click
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
            onClick={(e) => {
                e.stopPropagation()
                closeModal()
            }}
        >
            {children}
        </div>
    )
}

export default Modal
