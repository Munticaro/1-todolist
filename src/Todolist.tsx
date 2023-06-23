import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}


type PropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTasks: (id: string, todolistId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string,) => void
    changeTaskStatus: (taskId: string, todolistId: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, todolistId: string, newTitle: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export const Todolist = (props: PropsType) => {
    const onAllClickHandler = () => props.changeFilter(props.id, "all")
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed")
    const onActiveClickHandler = () => props.changeFilter(props.id, "active")
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    const addTask = (title: string) => {
        props.addTask(props.id, title)

    }

    return (
        <div className="App">
            <div>
                <h3>
                    <EditableSpan title={props.title} onChange={changeTodolistTitle} />
                    <button onClick={removeTodolist}>x</button>
                </h3>
                <AddItemForm addItem={addTask} />
                <ul>
                    {props.tasks.map(t => {
                        const onRemoveHandler = () => props.removeTasks(props.id, t.id)
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(props.id, t.id, e.currentTarget.checked);
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                          props.changeTaskTitle(props.id, t.id, newValue);
                        }
                        return (
                            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input
                                    type="checkbox"
                                    onChange={onChangeStatusHandler}
                                    checked={t.isDone}/>
                                <EditableSpan
                                    title={t.title}
                                    onChange={onChangeTitleHandler}/>
                                <button onClick={onRemoveHandler}>x</button>
                            </li>
                        )
                    })
                    }
                </ul>
                <div>
                    <button className={props.filter === "all" ? "active-filter" : ""}
                            onClick={onAllClickHandler}>All</button>
                    <button className={props.filter === "active" ? "active-filter" : ""}
                            onClick={onActiveClickHandler}>Active</button>
                    <button className={props.filter === "completed" ? "active-filter" : ""}
                            onClick={onCompletedClickHandler}>Completed</button>
                </div>
            </div>
        </div>
    );
}