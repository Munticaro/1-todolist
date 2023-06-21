import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}


function App() {
    const todolistsIdOne = v1();
    const todolistsIdTwo = v1();

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {
            id: todolistsIdOne,
            title: "What is learn",
            filter: 'all'
        },
        {
            id: todolistsIdTwo,
            title: "What is buy",
            filter: 'all'
        },
    ]);
    const [tasks, setTasks] = useState({
        [todolistsIdOne]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todolistsIdTwo]: [
            {id: v1(), title: "SSD", isDone: true},
            {id: v1(), title: "RAM", isDone: true},
            {id: v1(), title: "classic pants", isDone: false},
            {id: v1(), title: "classic shirt", isDone: false},
            {id: v1(), title: "loafers", isDone: false}
        ],
    })

    function removeTasks(todolistId: string, id: string) {
        debugger
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].filter(t => t.id !== id)
        })

    }
    const addTask = (todolistId: string, title: string) => {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({
            ...tasks, // Расскукожили обьект
            [todolistId]: // Обратились по ID
                [newTask, ...tasks[todolistId]] // Добавили новую таску в предварительно раскукоженный tasks и обратились по id
        })
    }
    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(e => e.id === taskId ? {
                ...e,
                isDone
            } : e)
        })
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone} : el)})
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        // setTasks([...tasks])
        // события в этой строке (t => t.id === taskId)
        // if (t.id === taskId) {
        //     return true
        // } else {
        //     return false
        // }
    }
    function changeFilter(todolistId: string, value: FilterValuesType) {
        setTodolists(todolists.map(el => el.id === todolistId ? {
            ...el,
            filter: value
        } : el))
        // ||
        // let todolist = todolists.find(tl => tl.id === todolistId);
        // if (todolist) {
        //     todolist.filter = value;
        //     setTodolists([...todolists]);
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId];
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {
                todolists.map(tl => {
                    let tasksForTodolist = tasks[tl.id];
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasks[tl.id].filter(t => t.isDone); /// isDone === true
                    }
                    if (tl.filter === "active") {
                        tasksForTodolist = tasks[tl.id].filter(t => !t.isDone); /// isDone === false
                    }
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        removeTasks={removeTasks}
                        tasks={tasksForTodolist}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                })
            }
        </div>
    )
}
export default App;
