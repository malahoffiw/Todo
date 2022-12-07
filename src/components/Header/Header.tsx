import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Project } from "../../types"
import OptionsBtn from "./OptionsBtn/OptionsBtn"
import styles from "./Header.module.scss"

type HeaderProps = {
    label?: string
    project?: Project
    backTo?: string
    searchQuery?: string
    setSearchQuery?: React.Dispatch<React.SetStateAction<any>>
}

/**
 * Header displayed on both pages.
 *
 */
const Header = ({
    label,
    backTo,
    project,
    searchQuery,
    setSearchQuery,
}: HeaderProps) => {
    const [isOptionsVisible, setIsOptionsVisible] = useState(false)

    return (
        <header className={styles.header}>
            {backTo && (
                <Link className={styles.header_back} to={backTo}>
                    &#10531;
                </Link>
            )}
            {label ? (
                <h2 className={styles.header_label}>{label}</h2>
            ) : (
                <label className={styles.header_search}>
                    &#128269;
                    <input
                        className={styles.header_search_input}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={"Название/номер задачи"}
                    />
                </label>
            )}

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
