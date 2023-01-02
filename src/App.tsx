import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from './Todlist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    function removeTask(id: string, todoLisyId: string) {
        let tasks = tasksObj[todoLisyId]
        let filteredTasks = tasks.filter((item) => item.id !== id)
        tasksObj[todoLisyId] = filteredTasks
        setTasksObj({...tasksObj})
    }

    function addTask(newTaskTitle: string, todoLisyId: string) {
        let task = {id: v1(), title: newTaskTitle, isDone: false}
        let tasks = tasksObj[todoLisyId]
        let newTasks = [task, ...tasks]
        tasksObj[todoLisyId] = newTasks
        setTasksObj({...tasksObj})
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId);
        if (todoList) {
            todoList.filter = value
            setTodoList([...todoLists])
        }
    }

    function changeStatus(taskId: string, isDone: boolean, todoLisyId: string) {
        let tasks = tasksObj[todoLisyId]
        let task = tasks.find(i => i.id === taskId)
        if (task) {
            task.isDone = !task.isDone
            tasksObj[todoLisyId] = [...tasks]
            setTasksObj({...tasksObj})
        }

    }

    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, setTodoList] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'What to lern', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ])

    let removeTodoList = (todoLisyId: string) => {
        let filteredTodoList = todoLists.filter(tl => tl.id !== todoLisyId)
        setTodoList(filteredTodoList)
        delete tasksObj[todoLisyId]
        setTasksObj({...tasksObj})
    }

    let [tasksObj, setTasksObj] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'Rect', isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: false},

        ]
    })

    const addTodoList = (title: string) => {
        let todoList: TodoListType = {
            id: v1(),
            filter: 'all',
            title: title,

        }
        setTodoList([todoList, ...todoLists])
        setTasksObj({
            ...tasksObj,
            [todoList.id]: []
        })
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {
                todoLists.map((tl) => {

                    let tasksForTodoList = tasksObj[tl.id];
                    if (tl.filter === 'completed') {
                        tasksForTodoList = tasksForTodoList.filter(item => item.isDone)
                    }
                    if (tl.filter === 'active') {
                        tasksForTodoList = tasksForTodoList.filter(item => !item.isDone)
                    }

                    return (
                        <Todolist
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodoList}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={tl.filter}
                            removeTodoList={removeTodoList}
                        />
                    )
                })
            }


        </div>
    );
}

export default App;
