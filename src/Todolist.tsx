import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}


type PropsType = {
    title: string
    tasks: TaskType[]
    removeTasks: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export const Todolist = (props: PropsType) => {
    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim());
            setTitle("");
        } else {
            setError("Its not good!")
        }
    }
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13)
            addTask();
    }
    const onAllClickHandler = () => props.changeFilter("all")
    const onCompletedClickHandler = () => props.changeFilter("completed")
    const onActiveClickHandler = () => props.changeFilter("active")

    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={title}
                           onChange={onNewTitleChangeHandler}
                           onKeyPress={onKeyPressHandler}
                           className={error ? "error" : ""}
                    />
                    <button onClick={addTask}>+</button>
                    {error && <div className="error-message" >{error}</div>}
                </div>
                <ul>
                    {props.tasks.map(t => {
                        const onRemoveHandler = () => props.removeTasks(t.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked);
                        }
                        return (
                            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input
                                    type="checkbox"
                                    onChange={onChangeHandler}
                                    checked={t.isDone}/>
                                <span>{t.title}</span>
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
