import React from "react";
import {FilterValuesType} from "./App";

export type TaskType={
    id: number,
    title: string,
    isDone: boolean
}

type PropsType={
     truck: string
     truck2?: number
     truck3?: boolean
    // tasks: Array<TaskType> устаревший вариант
     tasks: TaskType[]
     removeTasks1: (id: number) => void
     changeFilter: (value: FilterValuesType) => void
}

export const Todolist=(props:PropsType)=>{
    return(
        <div className="App">
            <div>
                <h3>{props.truck}</h3>
                <div>{props.truck2}</div>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {props.tasks.map((el) => {
                        return (
                        <li>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={ () => { props.removeTasks1(el.id) } }>x</button>
                        </li>
                        )
                    })}
                </ul>
                <div>
                    <button onClick={ () => {props.changeFilter("all")}} >All</button>
                    <button onClick={ () => {props.changeFilter("active")}}>Active</button>
                    <button onClick={ () => {props.changeFilter("completed")}}>Completed</button>
                </div>
            </div>
        </div>
    );
}
