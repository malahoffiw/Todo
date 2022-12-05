import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import ProjectCard from "../../components/mainPage/ProjectCard/ProjectCard"
import Modal from "../../components/Modal/Modal"
import styles from "./MainPage.module.scss"
import Header from "../../components/Header/Header"
import ProjectModal from "../../components/Modal/ProjectModal/ProjectModal"

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
            <Header label={"Мои проекты"} />
            <div
                className={styles.newProject}
                onClick={() => setIsModalVisible(true)}
            >
                <p className={styles.plus}>+</p>
            </div>
            <ul className={styles.projectList}>{projectCards}</ul>

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
