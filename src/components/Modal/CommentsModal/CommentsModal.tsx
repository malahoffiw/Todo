import React, { useRef, useState } from "react"
import dayjs from "dayjs"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { deleteComment } from "../../../redux/actions"
import { Comment } from "../../../types"
import { getNextId } from "../../../utils/getNextId"
import Modal from "../Modal"
import CommentElement from "../../projectPage/CommentElement/CommentElement"
import DeleteModal from "../DeleteModal/DeleteModal"
import styles from "./CommentsModal.module.scss"

type CommentsModalProps = {
    closeModal: () => void
    selectedTaskId: number
    projectId: number
    submitComment: (comment: Comment, type: string) => void
}

const CommentsModal = ({
    closeModal,
    selectedTaskId,
    projectId,
    submitComment,
}: CommentsModalProps) => {
    const dispatch = useAppDispatch()
    const comments = useAppSelector(
        (state) => state.projects[projectId].tasks[selectedTaskId].comments
    )
    const [newComment, setNewComment] = useState("")
    useState(false)
    const [isDeleteCommentModalVisible, setIsDeleteCommentModalVisible] =
        useState(false)
    const [chosenComment, setChosenComment] = useState<Comment>(null)
    const [inputType, setInputType] = useState<"new" | "modify" | "reply">(
        "new"
    )
    const inputRef = useRef<HTMLInputElement>(null)

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        switch (inputType) {
            case "new": {
                const comment: Comment = {
                    id: getNextId(comments),
                    message: newComment,
                    createdAt: dayjs(),
                    replies: {},
                }
                submitComment(comment, "new")

                break
            }
            case "modify": {
                const comment: Comment = {
                    id: chosenComment.id,
                    message: newComment,
                    createdAt: dayjs(),
                    replies: chosenComment.replies,
                }
                submitComment(comment, "existing")

                setChosenComment(null)
                setInputType("new")
                inputRef.current.placeholder = `Комментарий`
                break
            }
            case "reply": {
                const reply: Comment = {
                    id: getNextId(comments),
                    message: newComment,
                    createdAt: dayjs(),
                    replies: {},
                }
                const comment: Comment = {
                    id: chosenComment.id,
                    message: chosenComment.message,
                    createdAt: chosenComment.createdAt,
                    replies: {
                        ...chosenComment.replies,
                        [reply.id]: reply,
                    },
                }
                submitComment(comment, "existing")

                setChosenComment(null)
                setInputType("new")
                inputRef.current.placeholder = `Комментарий`
                break
            }
        }
        setNewComment("")
    }

    const currentComments = (): JSX.Element[] => {
        const result = []
        for (let [id, comment] of Object.entries(comments)) {
            result.push(
                <CommentElement
                    key={id}
                    comment={comment}
                    setChosenComment={setChosenComment}
                    setNewComment={setNewComment}
                    setIsDeleteCommentModalVisible={
                        setIsDeleteCommentModalVisible
                    }
                    inputRef={inputRef}
                    inputType={inputType}
                    setInputType={setInputType}
                />
            )
        }

        return result
    }

    const deleteChosenComment = (id = 0) => {
        if (id === 0) id = chosenComment.id
        dispatch(deleteComment(projectId, selectedTaskId, id))
        closeDeleteModal()
    }
    const closeDeleteModal = () => {
        setChosenComment(null)
        setIsDeleteCommentModalVisible(false)
    }

    return (
        <>
            <Modal
                isVisible={isDeleteCommentModalVisible}
                closeModal={closeDeleteModal}
            >
                <DeleteModal
                    label={"Вы уверены, что хотите удалить комментарий?"}
                    deleteItem={deleteChosenComment}
                    closeModal={closeDeleteModal}
                />
            </Modal>
            <div className={styles.back} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <p className={styles.header_label}>Комментарии</p>
                    <button className={styles.header_btn} onClick={closeModal}>
                        &#10004;
                    </button>
                </div>
                <div className={styles.content}>
                    <form className={styles.form} onSubmit={onSubmit}>
                        <input
                            ref={inputRef}
                            className={styles.form_input}
                            type="text"
                            placeholder={"Комментарий"}
                            value={newComment}
                            required
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button type={"submit"} className={styles.form_btn}>
                            Отправить
                        </button>
                    </form>
                    <ul className={styles.commentsList}>{currentComments()}</ul>
                </div>
            </div>
        </>
    )
}

export default CommentsModal
