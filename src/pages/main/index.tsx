import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import ProjectCard from "../../components/mainPage/ProjectCard/ProjectCard"
import Modal from "../../components/Modal/Modal"
import Header from "../../components/Header/Header"
import ProjectModal from "../../components/Modal/ProjectModal/ProjectModal"
import styles from "./MainPage.module.scss"
import getString from "../../utils/getString"

const Main = () => {
    const projects = useAppSelector((state) => state.projects)
    const dispatch = useAppDispatch()
    const [isModalVisible, setIsModalVisible] = useState(false)

    const closeModal = () => {
        setIsModalVisible(false)
    }

    const projectCards = []
    for (let [id, project] of Object.entries(projects)) {
        projectCards.push(
            <Link to={`projects/${id}`} key={id}>
                <ProjectCard data={project} />
            </Link>
        )
    }

    return (
        <main className={styles.main}>
            <Header label={getString("HEADING_MAIN")} />
            <div
                className={styles.main_newProject}
                onClick={() => setIsModalVisible(true)}
            >
                <p className={styles.main_newProject_plus}>+</p>
            </div>
            <ul className={styles.main_projectList}>{projectCards}</ul>

            <Modal isVisible={isModalVisible} closeModal={closeModal}>
                <ProjectModal
                    dispatch={dispatch}
                    closeModal={closeModal}
                    label={""}
                />
            </Modal>
        </main>
    )
}

export default Main
