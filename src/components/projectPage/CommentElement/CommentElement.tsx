import React from "react"
import { Comment } from "../../../types"
import styles from "./CommentElement.module.scss"

type CommentElementProps = {
    comment: Comment
    setChosenComment: React.Dispatch<React.SetStateAction<Comment>>
    setNewComment: React.Dispatch<React.SetStateAction<string>>
    inputRef: React.MutableRefObject<HTMLInputElement>
    setIsDeleteCommentModalVisible: React.Dispatch<
        React.SetStateAction<boolean>
    >
    inputType: "new" | "modify" | "reply"
    setInputType: React.Dispatch<
        React.SetStateAction<"new" | "modify" | "reply">
    >
}

/**
 * Element displayed in the Comments Modal window.
 *
 */
const CommentElement = ({
    comment,
    setChosenComment,
    setNewComment,
    inputRef,
    setIsDeleteCommentModalVisible,
    inputType,
    setInputType,
}: CommentElementProps) => {
    // Generates replies for each comment
    const replies = (): JSX.Element[] => {
        const result = []
        for (let reply of comment.replies) {
            result.push(
                <CommentElement
                    key={reply.id}
                    comment={reply}
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

    return (
        <>
            <li className={styles.comment}>
                <p className={styles.comment_message}>{comment.message}</p>
                <p className={styles.comment_time}>
                    {comment.createdAt.format("HH:mm DD.MM.YY")}
                </p>
                <div className={styles.comment_btns}>
                    <button
                        onClick={() => {
                            if (inputType !== "reply") {
                                setChosenComment(comment)
                                setInputType("reply")
                                setNewComment("")
                                inputRef.current.focus()
                                inputRef.current.placeholder = `Ответ на "${comment.message}"`
                            } else {
                                setChosenComment(null)
                                setInputType("new")
                                setNewComment("")
                                inputRef.current.focus()
                                inputRef.current.placeholder = `Комментарий`
                            }
                        }}
                    >
                        &#8618;
                    </button>
                    <button
                        onClick={() => {
                            if (inputType !== "modify") {
                                setChosenComment(comment)
                                setInputType("modify")
                                setNewComment(comment.message)
                                inputRef.current.focus()
                            } else {
                                setChosenComment(null)
                                setInputType("new")
                                setNewComment("")
                                inputRef.current.placeholder = `Комментарий`
                                inputRef.current.focus()
                            }
                        }}
                    >
                        &#128394;
                    </button>
                    <button
                        onClick={() => {
                            setChosenComment(comment)
                            setInputType("new")
                            setNewComment("")
                            inputRef.current.placeholder = `Комментарий`
                            setIsDeleteCommentModalVisible(true)
                        }}
                    >
                        &#128465;
                    </button>
                </div>
            </li>
            <ul className={styles.replies}>{replies()}</ul>
        </>
    )
}

export default CommentElement
