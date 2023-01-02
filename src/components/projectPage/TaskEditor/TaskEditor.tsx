import React from "react"
import { Editor as TinyMCEEditor } from "@tinymce/tinymce-react"
import { Editor } from "tinymce"
import useWindowParameters from "../../../hooks/useWindowParameters"

type TaskEditorProps = {
    editorRef: React.MutableRefObject<Editor>
    initialContent: string
}

/**
 * TinyMCE Editor component for tasks and subtasks.
 *
 */
const TaskEditor = ({ editorRef, initialContent }: TaskEditorProps) => {
    const { windowHeight } = useWindowParameters()

    return (
        <TinyMCEEditor
            apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={initialContent}
            init={{
                height: Math.floor(windowHeight / 2),
                statusbar: false,
                plugins: [
                    "advlist",
                    "autolink",
                    "emoticons",
                    "lists",
                    "link",
                    "charmap",
                    "preview",
                    "searchreplace",
                    "visualblocks",
                    "media",
                    "table",
                    "help",
                    "wordcount",
                    "quickbars",
                    "image",
                    "fullscreen",
                ],
                quickbars_selection_toolbar:
                    "bold italic underline backcolor forecolor | fontsize fontfamily | quicklink blockquote | removeformat",
                quickbars_insert_toolbar:
                    "quickimage quicktable media | bullist numlist checklist",
                quickbars_image_toolbar: "alignleft aligncenter alignright ",
                toolbar:
                    "fullscreen export undo redo | styles | bold italic underline backcolor forecolor | " +
                    "bullist numlist checklist | " +
                    "fontsize fontfamily",
                menu: {
                    file: {
                        title: "File",
                        items: "export print",
                    },
                    edit: {
                        title: "Edit",
                        items: "undo redo | cut copy paste pastetext | selectall | searchreplace",
                    },
                    view: {
                        title: "View",
                        items: "code | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments",
                    },
                    insert: {
                        title: "Insert",
                        items: "image link media inserttable | charmap emoticons hr",
                    },
                    format: {
                        title: "Format",
                        items: "bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | removeformat",
                    },
                    table: {
                        title: "Table",
                        items: "inserttable | cell row column | advtablesort | tableprops deletetable",
                    },
                    help: { title: "Help", items: "help" },
                },
                content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:16px; background-color: #2f2f2f; color: #d3d3d3 }",
                mobile: {
                    plugins: [
                        "advlist",
                        "autolink",
                        "emoticons",
                        "lists",
                        "link",
                        "charmap",
                        "preview",
                        "searchreplace",
                        "visualblocks",
                        "fullscreen",
                        "media",
                        "table",
                        "help",
                        "wordcount",
                        "quickbars",
                        "image",
                    ],
                    toolbar:
                        "fullscreen | styles backcolor forecolor " +
                        "fontsize fontfamily | bullist numlist checklist " +
                        "| table image media",
                },
            }}
        />
    )
}

export default TaskEditor
