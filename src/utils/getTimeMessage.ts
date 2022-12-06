import dayjs, { Dayjs } from "dayjs"
import getNoun from "./getNoun"

const MINUTE_IN_MS = 60000
const HOUR_IN_MS = 3600000
const DAY_IN_MS = 86400000

const getTimeMessage = (createdAt: Dayjs) => {
    const time = dayjs().diff(createdAt)

    if (time < MINUTE_IN_MS) {
        return "Создана только что"
    }
    if (time < HOUR_IN_MS) {
        const now = dayjs().diff(createdAt, "minutes")
        return `Создана ${now} ${getNoun(now, [
            "минуту",
            "минуты",
            "минут",
        ])} назад`
    }
    if (time < DAY_IN_MS) {
        const now = dayjs().diff(createdAt, "hours")
        return `Создана ${now} ${getNoun(now, ["час", "часа", "часов"])} назад`
    }

    const now = dayjs().diff(createdAt, "days")
    return `Создана ${now} ${getNoun(now, ["день", "дня", "дней"])} назад`
}

export default getTimeMessage
