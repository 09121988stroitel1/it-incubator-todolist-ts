import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

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
    changeTaskStatus: (taskId: string, isDone: boolean)=> void
    filter: FilterValuesType
}
 const Todolist = (props: PropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>)=> {
        // console.log(e.currentTarget.value)
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler =  (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if(e.key === 'Enter') {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }

    }
    const addTask = ()=> {
        if(newTaskTitle.trim() !== ''){
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Field is required')
        }

    }

    const onAllClickHandler = ()=> props.changeFilter("all")
    const onActiveClickHandler = ()=> props.changeFilter("active")
    const onCompletedClickHandler = ()=> props.changeFilter("completed")


    return (
        <div>
            <h3>props.title</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={ error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {props.tasks.map((item)=> {

                    const onClickHandler = ()=> props.removeTask(item.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>)=> {
                        props.changeTaskStatus(item.id,  e.currentTarget.checked)
                    }

                return(
                <li className={item.isDone ? 'is-done' : ''} key={item.id}>
                <input
                    type="checkbox"
                    checked={item.isDone}
                    onChange={onChangeHandler}
                />
                <span>{item.title}</span>
                <button onClick={ onClickHandler }>x</button>
                </li>
                )
            })
                }
            </ul>
            <div>
                <button className={props.filter === 'all'? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active'? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed'? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed</button>
            </div>

        </div>
    )
}

export default Todolist