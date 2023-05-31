import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ]);

    let [filter, setFilter] = useState<FilterValuesType>("active");

    function removeTasks(id: string) {
        let filteredTasks = tasks.filter(el => el.id !== id)
        setTasks(filteredTasks)
    }

    const addTask = (title: string)=> {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let tasksForTodolist = tasks;
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(el => el.isDone); /// isDone === true
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(el => !el.isDone); /// isDone === false
    }


    return (
        <div className="App">
            <Todolist
                title={"What to learn"}
                removeTasks={removeTasks}
                tasks={tasksForTodolist}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );

}

export default App;
