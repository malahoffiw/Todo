import React from "react"
import Dropzone, {
    IDropzoneProps,
    IMeta,
    IPreviewProps,
} from "react-dropzone-uploader"
import styles from "./DropzoneModal.module.scss"

type DropzoneModalProps = {
    closeModal: () => void
    saveFiles: (files: IMeta[]) => void
}

/**
 * Preview of uploaded files displayed in the Dropzone modal window
 *
 */
const Preview = ({ meta }: IPreviewProps) => {
    const { name, previewUrl } = meta
    return (
        <span className={styles.preview}>
            <p className={styles.preview_label}>{name}</p>
            {previewUrl && (
                <img
                    className={styles.preview_image}
                    src={previewUrl}
                    alt="preview"
                />
            )}
        </span>
    )
}

/**
 * Modal window to display uploading files zone
 * available on click and via DnD
 *
 */
const DropzoneModal = ({ closeModal, saveFiles }: DropzoneModalProps) => {
    // On submit saves uploaded files to Task Modal Data
    // not straight to the state
    // They will be saved to the state when the Task is saved
    //
    // Also File objects cannot be saved at the Redux state
    // because they cannot be serialized for localStorage
    // (and this project currently has no backend),
    // so I only save the Metadata of files there
    const handleSubmit: IDropzoneProps["onSubmit"] = (files) => {
        saveFiles(files.map((file) => file.meta))
        files.forEach((f) => f.remove())
        closeModal()
    }

    return (
        <div className={styles.back} onClick={(e) => e.stopPropagation()}>
            <div className={styles.header}>
                <p className={styles.header_label}>Прикрепить файлы</p>
                <button className={styles.header_btn} onClick={closeModal}>
                    &#10004;
                </button>
            </div>
            <div className={styles.dropzone}>
                <Dropzone
                    PreviewComponent={Preview}
                    onSubmit={handleSubmit}
                    styles={{
                        dropzone: {
                            minHeight: 330,
                            maxHeight: 330,
                            border: "none",
                        },
                        inputLabel: {
                            color: "#d3d3d3",
                        },
                    }}
                    inputContent={"Выберите файл"}
                />
            </div>
        </div>
    )
}

export default DropzoneModal
