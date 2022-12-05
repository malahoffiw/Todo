import React, { useState } from "react"
import styles from "./Header.module.scss"
import OptionsBtn from "./OptionsBtn/OptionsBtn"
import { Link } from "react-router-dom"
import { Project } from "../../types"

type HeaderProps = {
    label: string
    project?: Project
    backTo?: string
}

const Header = ({ label, backTo, project }: HeaderProps) => {
    const [isOptionsVisible, setIsOptionsVisible] = useState(false)

    return (
        <header className={styles.header}>
            {backTo && (
                <Link className={styles.header_back} to={backTo}>
                    &#10531;
                </Link>
            )}
            <h2 className={styles.header_label}>{label}</h2>
            {project && (
                <OptionsBtn
                    isOptionsVisible={isOptionsVisible}
                    setIsOptionsVisible={setIsOptionsVisible}
                    project={project}
                />
            )}
        </header>
    )
}

export default Header
