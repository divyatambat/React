import { memo } from "react";
import "./style.css";

export const TodoListItemsComponents = ({ isCompleted, duedate, title, id, markTodoCompleted, }:
    {
        isCompleted: boolean;
        duedate: string,
        title: string,
        id: number,
        markTodoCompleted: (id: number, isCompleted: boolean) => void
    }) => {
    return (
        <li>
            <input type="checkbox" checked={isCompleted} onChange={(e) => markTodoCompleted(id, e.target.checked)}></input>
            <label>{title}</label>
            <label>{duedate}</label>
        </li>
    )
}

export const TodoListItems = memo(TodoListItemsComponents)