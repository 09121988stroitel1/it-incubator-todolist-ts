import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string)=> void
    changeFilter: (values: FilterValuesType) => void
    addTask:(newTaskTitle: string) => void

}
 const Todolist = (props: PropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>)=> {
        // console.log(e.currentTarget.value)
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler =  (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }

    }

    const addTask = ()=> {
        props.addTask(newTaskTitle)
        setNewTaskTitle('')
    }

    return (
        <div>
            <h3>props.title</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map((item)=> {
                return(
                <li key={item.id}>
                <input type="checkbox" checked={item.isDone}/>
                <span>{item.title}</span>
                <button onClick={ ()=> {props.removeTask(item.id)} }>x</button>
                </li>
                )
            })
                }
            </ul>
            <div>
                <button onClick={()=> {props.changeFilter("all")}}>All</button>
                <button onClick={()=> {props.changeFilter("active")}}>Active</button>
                <button onClick={()=> {props.changeFilter("completed")}}>Completed</button>
            </div>

        </div>
    )
}

export default Todolist