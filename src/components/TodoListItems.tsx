import { memo } from "react";
import "./style.css";

export const TodoListItemsComponents = ({ completed, duedate, title, id, markTodoCompleted, }:
    {
        completed: boolean;
        duedate: string,
        title: string,
        id: number,
        markTodoCompleted: (id: number, completed: boolean) => void
    }) => {
    return (
        <li>
            <input type="checkbox" checked={completed} onChange={(e) => markTodoCompleted(id, e.target.checked)}></input>
            <label>{title}</label>
            <label>{duedate}</label>
        </li>
    )
}

export const TodoListItems = memo(TodoListItemsComponents)