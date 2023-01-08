import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoLisyId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (newTaskTitle: string, todoLisyId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoLisyId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoLisyId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoLisyId: string) => void
    changeTodoListTitle: (newTitle: string, id: string) => void

}
const Todolist = (props: PropsType) => {

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const removeTodoList = () => props.removeTodoList(props.id)
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(newTitle, props.id)
    }


    return (
        <div>

            <h3>
                <EditableSpan title={props.title}
                              onChange={changeTodoListTitle}
            />

                <button onClick={removeTodoList}>x</button>
            </h3>
            <AddItemForm
                addItem={addTask}
            />
            <ul>
                {props.tasks.map((item) => {
                    const onClickHandler = () => props.removeTask(item.id, props.id)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(item.id, e.currentTarget.checked, props.id)
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(item.id, newValue, props.id)
                    }

                    return (
                        <li className={item.isDone ? 'is-done' : ''} key={item.id}>
                            <input
                                type="checkbox"
                                checked={item.isDone}
                                onChange={onChangeStatusHandler}
                            />
                            <EditableSpan title={item.title}
                                          onChange={onChangeTitleHandler}
                            />
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    )
                })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>

        </div>
    )
}

export default Todolist

