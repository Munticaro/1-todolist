import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed"

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: TaskType[]
}

const todolistsIdOne = v1();
const todolistsIdTwo = v1();
function App() {


    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistsIdOne, title: "What is learn", filter: 'all'},
        {id: todolistsIdTwo, title: "What is buy", filter: 'all'},
    ]);
    const [tasksObj, setTasks] = useState<TasksStateType>({
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
            ...tasksObj,
            [todolistId]: tasksObj[todolistId].filter(t => t.id !== id)
        })

    }
    const addTask = (todolistId: string, title: string) => {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({
            ...tasksObj, // Расскукожили обьект
            [todolistId]: // Обратились по ID
                [newTask, ...tasksObj[todolistId]] // Добавили новую таску в предварительно раскукоженный tasksObj и обратились по id
        })
    }
    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasksObj,
            [todolistId]: tasksObj[todolistId].map(e => e.id === taskId ? {
                ...e,
                isDone
            } : e)
        })
        // setTasks({...tasksObj, [todolistId]: tasksObj[todolistId].map(el => el.id === taskId ? {...el, isDone} : el)})
        // let task = tasksObj.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        // setTasks([...tasksObj])
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
        delete tasksObj[todolistId];
        setTasks({...tasksObj})
    }

    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title: newTitle} : tl))
    }
    const addTodolist = (title: string) => {
        let todolist: TodolistType = {id: v1(), filter: "all", title: title}
        setTodolists([todolist, ...todolists])
        setTasks({...tasksObj, [todolist.id]: []})
    }

    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        setTasks({
            ...tasksObj,
            [todolistId]: tasksObj[todolistId].map(e => e.id === taskId ? {
                ...e,
                title: newTitle
            } : e)
        })
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}  />
            {
                todolists.map(tl => {
                    let tasksForTodolist = tasksObj[tl.id];
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksObj[tl.id].filter(t => t.isDone); /// isDone === true
                    }
                    if (tl.filter === "active") {
                        tasksForTodolist = tasksObj[tl.id].filter(t => !t.isDone); /// isDone === false
                    }
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        removeTasks={removeTasks}
                        changeTodolistTitle={changeTodolistTitle}
                        tasks={tasksForTodolist}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        changeTaskTitle={changeTaskTitle}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}

                    />
                })
            }
        </div>
    )
}
export default App;