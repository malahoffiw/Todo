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

const DropzoneModal = ({ closeModal, saveFiles }: DropzoneModalProps) => {
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
