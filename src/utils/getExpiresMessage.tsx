import React from "react"
import dayjs, { Dayjs } from "dayjs"
import styles from "../components/projectPage/TaskCard/TaskCard.module.scss"
import getNoun from "./getNoun"

const FIVE_MINUTES_IN_MS = 300000
const HOUR_IN_MS = 3600000
const DAY_IN_MS = 86400000

const getExpiresMessage = (expiresAt: Dayjs) => {
    const time = expiresAt.diff(dayjs())

    if (time < 0) return <p className={styles.minutes}>Время истекло</p>
    if (time < FIVE_MINUTES_IN_MS)
        return <p className={styles.minutes}>Меньше 5 минут</p>
    if (time < HOUR_IN_MS) {
        const left = expiresAt.diff(dayjs(), "minutes")
        return (
            <p className={styles.minutes}>
                До конца {left} {getNoun(left, ["минута", "минуты", "минут"])}
            </p>
        )
    }
    if (time < DAY_IN_MS) {
        const left = expiresAt.diff(dayjs(), "hours")
        return (
            <p className={styles.hours}>
                До конца {left} {getNoun(left, ["час", "часа", "часов"])}
            </p>
        )
    } else {
        const left = expiresAt.diff(dayjs(), "days")
        return (
            <p className={styles.days}>
                До конца {left} {getNoun(left, ["день", "дня", "дней"])}
            </p>
        )
    }
}

export default getExpiresMessage
