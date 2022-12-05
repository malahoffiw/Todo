import { CREATE_COMMENT, DELETE_COMMENT, MODIFY_COMMENT } from "../types"
import { Comment, CommentsList } from "../../types"

export type CommentsAction = {
    type: string
    comment?: Comment
    commentId?: number
}

const commentsReducer = (
    state: CommentsList,
    action: CommentsAction
): CommentsList => {
    switch (action.type) {
        case CREATE_COMMENT:
            return {
                ...state,
                [action.comment.id]: action.comment,
            }
        case MODIFY_COMMENT: {
            const commentId = action.comment.id
            const goDeeper = (state: CommentsList): CommentsList => {
                if (state[commentId])
                    return {
                        ...state,
                        [commentId]: action.comment,
                    }

                for (let [id, comment] of Object.entries(state)) {
                    state[Number(id)].replies = goDeeper(comment.replies)
                }

                return {
                    ...state,
                }
            }

            return goDeeper(state)
        }
        case DELETE_COMMENT: {
            const commentId = action.commentId
            const goDeeper = (state: CommentsList): CommentsList => {
                if (state[commentId]) {
                    const { [commentId]: _, ...rest } = state
                    return rest
                }

                for (let [id, comment] of Object.entries(state)) {
                    state[Number(id)].replies = goDeeper(comment.replies)
                }

                return {
                    ...state,
                }
            }

            return goDeeper(state)
        }
        default:
            return state
    }
}

export default commentsReducer
