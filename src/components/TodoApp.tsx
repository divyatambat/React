import { useCallback, useEffect, useMemo, useState } from "react"
import { AddTodoForm } from "./AddTodoForm"
import { TodoFilter } from "./TodoFilter"
import { TodoList } from "./TodoList"
import "./style.css"
import { TodoItem } from "../types/type"
import NavBar from "./NavBar"
import axios from "axios"

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

    const addTodo = useCallback(
        async (title: string, duedate: string) => {
            const newTodo = {
                id: todos.length + 1,
                title,
                duedate,
                completed: false,
            };

            try {
                const response = await axios.post('http://localhost:8000/todos', newTodo);
                setTodos((prevTodos) => [...prevTodos, response.data]);
            } catch (error) {
                console.error('Error adding todo:', error);
            }
        },
        [todos]
    );

    const displayedTodos = useMemo(
        () =>
            ShowCompleted
                ? todos.filter((todo) => {
                    return todo.completed === true
                })
                : todos,
        [todos, ShowCompleted]
    )

    const markTodoCompleted = useCallback((id: number, completed: boolean) => {
        setTodos(
            todos.map((todo) => {
                if (id === todo.id) {
                    return { ...todo, completed: completed }
                } else {
                    return todo
                }
            })
        )
    }, [todos])

    let items = ["Home", "Add Todo"];
    return (
        <div style={{ padding: 14 }}>
            <NavBar
                navName="TodoApp"
                navItems={items} />
            <AddTodoForm addTodo={addTodo} />
            <TodoFilter showCompleted={ShowCompleted} setShowCompleted={setShowCompleted} />
            {loading ? <p style={{ textAlign: "center" }}>Loading...</p> : <TodoList todos={displayedTodos} markTodoCompleted={markTodoCompleted} />}
        </div>
    )
};