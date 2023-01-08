import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string)=> void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    let [editMode, steEditMode] = useState(false)
    let [title, steTitle] = useState('')

    const activateEditMode = () => {
        steEditMode(true)
        steTitle(props.title)
    }
    const activateVievMode = () => {
        steEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>)=> {
        steTitle(e.currentTarget.value)
    }

    return (
     editMode
            ?
            <input onBlur={activateVievMode} onChange={onChangeTitleHandler}  value={title} autoFocus/>
            :
            <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}