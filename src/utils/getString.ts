import { LangStringsKeys } from "../types/lang"
import { strings as stringsEn } from "../lang/en"
import { strings as stringsRu } from "../lang/ru"

/**
 * Gets a localized text string based on language of user's browser setting or choice
 *
 */
const getString = (id: LangStringsKeys) => {
    let lang = localStorage.getItem("userLang")

    if (!lang) {
        lang = navigator.language
        localStorage.setItem("userLang", lang)
    }

    return lang.includes("ru") ? stringsRu[id] : stringsEn[id]
}

export default getString
