import { useEffect, useState } from "react"
import { AddTodoForm } from "./AddTodoForm"
import { TodoFilter } from "./TodoFilter"
import { TodoList } from "./TodoList"
import "./style.css"
import { TodoItem } from "../types/type"
import NavBar from "./NavBar"

export const TodoApp = () => {
    const [todos, setTodos] = useState<TodoItem[]>([])
    const [ShowCompleted, setShowCompleted] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("http://localhost:8000/todos")
            .then((res) => res.json())
            .then((response) => setTodos(response))
        setLoading(false)
    }, [])

    const addTodo = (title: string) => {
        setTodos([...todos, { id: todos.length + 1, title, completed: false }]);
    };

    const displayedTodos = ShowCompleted
        ? todos.filter((todo) => {
            return todo.completed === true
        })
        : todos;

    const markTodoCompleted = (id: number, completed: boolean) => {
        setTodos(
            todos.map((todo) => {
                if (id === todo.id) {
                    return { ...todo, completed: completed }
                } else {
                    return todo
                }
            })
        )
    }

    let items = ["Home", "Add Todo"];
    return (
        <div>
            <NavBar
                navName="TodoApp"
                navItems={items} />
            <AddTodoForm addTodo={addTodo} />
            <TodoFilter showCompleted={ShowCompleted} setShowCompleted={setShowCompleted} />
            {loading ? <p>Loading...</p> : <TodoList todos={displayedTodos} markTodoCompleted={markTodoCompleted} />}
        </div>
    )
};