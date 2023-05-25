import React, { useState } from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const truck= 'What to learn1 Sasha'
    // const truckNew= 'What to learn TripleAlex'

    let [tasks1, setTasks1] = useState< Array<TaskType> >([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "Redux", isDone: false }
    ]);
    let [filter, setFilter] = useState<FilterValuesType>("active");

    function removeTask(id: number) {
        let filteredTasks1 = tasks1.filter( el => el.id !== id)
        setTasks1(filteredTasks1)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let tasksForTodolist = tasks1;
    if (filter === "completed") {
        tasksForTodolist = tasks1.filter(el => el.isDone === true);
    }
    if (filter === "active") {
        tasksForTodolist = tasks1.filter(el => el.isDone === false);
    }
    // const tasks2 = [
    //     { id: 1, title: "Hello world", isDone: true },
    //     { id: 2, title: "I am Happy", isDone: false },
    //     { id: 3, title: "Yo", isDone: false }
    // ]

    return (
        <div className="App">
            <Todolist
                truck={truck}
                truck2={100200}
                tasks={tasksForTodolist}
                removeTasks1={removeTask}
                changeFilter={changeFilter}
            />
            {/*<Todolist truck={truckNew} truck3={true} tasks={tasks2}/>*/}
        </div>
    );

}

export default App;
