import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Comment } from "../../types"

const initialState: Comment[] = []

export const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        createComment: (
            state,
            action: PayloadAction<{ newComment: Comment }>
        ) => {
            state.push(action.payload.newComment)
        },
        deleteComment: (
            state,
            action: PayloadAction<{ commentId: number }>
        ) => {
            /**
             * Recursively traverses the state to find a comment to delete.
             */
            const goDeeper = (state: Comment[]): Comment[] => {
                if (
                    state.find(
                        (comment) => comment.id === action.payload.commentId
                    )
                ) {
                    return state.filter(
                        (comment) => comment.id !== action.payload.commentId
                    )
                }

                for (let comment of state) {
                    comment.replies = goDeeper(comment.replies)
                }

                return state
            }

            return goDeeper(state)
        },
        modifyComment: (
            state,
            action: PayloadAction<{ commentId: number; newComment: Comment }>
        ) => {
            /**
             * Recursively traverses the state to find a comment to modify.
             */
            const goDeeper = (state: Comment[]): Comment[] => {
                if (
                    state.find(
                        (comment) => comment.id === action.payload.commentId
                    )
                ) {
                    return state.map((comment) => {
                        if (comment.id === action.payload.commentId) {
                            return action.payload.newComment
                        }
                        return comment
                    })
                }

                for (let comment of state) {
                    comment.replies = goDeeper(comment.replies)
                }

                return state
            }

            return goDeeper(state)
        },
    },
})

export const { createComment, deleteComment, modifyComment } =
    commentsSlice.actions

export default commentsSlice.reducer
