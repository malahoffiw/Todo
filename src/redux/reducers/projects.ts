import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import dayjs from "dayjs"
import { Project } from "../../types"
import { getNextId } from "../../utils/getNextId"

const initialState: Project[] = []

export const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        createProject: (
            state,
            action: PayloadAction<{ projectLabel: string }>
        ) => {
            const id = getNextId(state)
            const newProject: Project = {
                id,
                label: action.payload.projectLabel,
                createdAt: dayjs(),
            }

            state.push(newProject)
        },
        deleteProject: (
            state,
            action: PayloadAction<{ projectId: number }>
        ) => {
            return state.filter(
                (project) => project.id !== action.payload.projectId
            )
        },
        modifyProject: (
            state,
            action: PayloadAction<{ projectId: number; projectLabel: string }>
        ) => {
            return state.map((project) => {
                if (project.id === action.payload.projectId) {
                    return {
                        ...project,
                        label: action.payload.projectLabel,
                    }
                }
                return project
            })
        },
    },
})

export const { createProject, deleteProject, modifyProject } =
    projectsSlice.actions
export default projectsSlice.reducer
