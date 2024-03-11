import { memo, useEffect, useMemo, useState } from "react";
import { TodoItem } from "../types/type"
import { TodoListItems } from "./TodoListItems"
import "./style.css";

const TodoListComponents = (props: {
    todos: TodoItem[]
    markTodoCompleted: (id: number, isCompleted: boolean) => void
}) => {

    const [search, setSearch] = useState("")
    const [sortDirection, setSortDirections] = useState("0");

    const filteredTodos = useMemo(() => props.todos.filter((todo) => todo.title.includes(search)),
        [props.todos, search]
    )

    const sortedTodos = useMemo(
        () =>
            filteredTodos.sort((a, b) =>
                sortDirection === "0" ? (a.title > b.title ? 1 : -1) : a.title > b.title ? -1 : 1
            ),
        [filteredTodos, sortDirection]
    )

    return (
        <div>
            <br></br>
            <h3>TODO List</h3>
            <input type="text" value={search} placeholder="Search..." onChange={(e) => setSearch(e.target.value)}></input>

            <label>Sort </label>
            <select onChange={(e) => setSortDirections(e.target.value)}>
                <option value={0}>A-Z</option>
                <option value={1}>Z-A</option>
            </select>

            <ul>
                {sortedTodos.map((todo) => (
                    <TodoListItems
                        key={todo.id}
                        id={todo.id}
                        isCompleted={todo.isCompleted}
                        title={todo.title}
                        duedate={todo.duedate}
                        markTodoCompleted={props.markTodoCompleted} />
                ))}
            </ul>
        </div>
    );
}

export const TodoList = memo(TodoListComponents)