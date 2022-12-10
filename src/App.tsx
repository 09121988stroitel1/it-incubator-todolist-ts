import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todlist";

export type FilterValuesType = "all" | "completed" | "active"

function App() {


     const [tasks, setTasks] = useState< Array<TaskType> >([
         {id: 1, title: "CSS", isDone:true},
         {id: 2, title: "JS", isDone:true},
         {id: 3, title: "Rect", isDone:false},
     ]);
     let [filter, setFilter] =useState<FilterValuesType>("all")

    function  removeTask(id: number) {
       let filteredTasks  = tasks.filter( (item)=> item.id !== id)
        setTasks(filteredTasks)
    }

    function  changeFilter(value: FilterValuesType) {
         setFilter(value)
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
      />

    </div>
  );
}

export default App;
