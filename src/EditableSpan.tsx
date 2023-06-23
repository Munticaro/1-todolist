import React, {ChangeEvent, useState} from "react";

type EditableSpanType = {
    title: string
}
export const EditableSpan = (props: EditableSpanType) => {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    };
    const activateViewMode = () => {
        setEditMode(false)

    };
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    return (
        editMode
            ? <input value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}