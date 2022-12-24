import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todlist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active"

function App() {


     const [tasks, setTasks] = useState< Array<TaskType> >([
         {id: v1(), title: "CSS", isDone:true},
         {id: v1(), title: "JS", isDone:true},
         {id: v1(), title: "Rect", isDone:false},
     ]);
     let [filter, setFilter] =useState<FilterValuesType>("all")

    function  removeTask(id: string) {
       let filteredTasks  = tasks.filter( (item)=> item.id !== id)
        setTasks(filteredTasks)
    }
    function  addTask (newTaskTitle: string) {
         let newTask = {id: v1(), title: newTaskTitle, isDone: false}
        let newTasks = [newTask, ...tasks]
         setTasks(newTasks)
    }

    function  changeFilter(value: FilterValuesType) {
         setFilter(value)
    }

    function changeStatus (taskId: string, isDone: boolean) {
       let task = tasks.find(i=> i.id === taskId)
        if(task) {
            task.isDone = !task.isDone
        }
        let copy = [...tasks]
        setTasks(copy)
    }


    let tasksForTodoList = tasks;
     if(filter === "completed") {
         tasksForTodoList = tasks.filter( item => item.isDone === true)
     }
     if(filter === "active") {
         tasksForTodoList = tasks.filter( item => item.isDone === false)
     }

  return (
    <div className="App">
      <Todolist
          title="What to lern"
          tasks ={tasksForTodoList}
          removeTask={removeTask}
          changeFilter={changeFilter}
          addTask={addTask}
          changeTaskStatus={changeStatus}
          filter={filter}
      />

    </div>
  );
}

export default App;
