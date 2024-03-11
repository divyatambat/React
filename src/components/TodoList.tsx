import { memo } from "react";
import { TodoItem } from "../types/type"
import { TodoListItems } from "./TodoListItems"
import "./style.css";

export const TodoListComponents = (props: {
    todos: TodoItem[], markTodoCompleted: (id: number, completed: boolean) => void
}) => {
    return (
        <div>
            <br></br>
            <h3>TODO List</h3>
            <ul>
                {props.todos.map((todo) => (
                    <TodoListItems
                        key={todo.id}
                        id={todo.id}
                        completed={todo.completed}
                        title={todo.title}
                        duedate={todo.duedate}
                        markTodoCompleted={props.markTodoCompleted} />
                ))}
            </ul>
        </div>
    )
}

export const TodoList = memo(TodoListComponents)