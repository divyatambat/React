import { useCallback, useEffect, useMemo, useState } from "react"
import { AddTodoForm } from "./AddTodoForm"
import { TodoFilter } from "./TodoFilter"
import { TodoList } from "./TodoList"
import "./style.css"
import { TodoItem } from "../types/type"
import { URL } from "../data/UrlApi"
import NavBar from "./NavBar"
import axios from "axios"

export const TodoApp = () => {
    const [todos, setTodos] = useState<TodoItem[]>([])
    const [ShowCompleted, setShowCompleted] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(URL)
            .then((res) => res.json())
            .then((response) => setTodos(response))
            .finally(() => setLoading(false));
    }, []);

    const addTodo = useCallback(
        async (title: string, duedate: string) => {
            if (!title || !duedate) {
                console.warn("Please enter both title and due date");
                return;
            }

            const newTodo = {
                id: todos.length + 1,
                title,
                duedate,
                isCompleted: false,
            };

            try {
                const response = await axios.post(URL, newTodo);
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
                    return todo.isCompleted === true
                })
                : todos,
        [todos, ShowCompleted]
    )

    const markTodoCompleted = useCallback((id: number, isCompleted: boolean) => {
        setTodos(
            todos.map((todo) => {
                if (id === todo.id) {
                    return { ...todo, isCompleted: isCompleted }
                } else {
                    return todo
                }
            })
        )
    }, [todos]);

    let items = ["Home", "Add Todo"];
    return (
        <div style={{ padding: 10 }}>
            <NavBar
                navName="TodoApp"
                navItems={items} />
            <AddTodoForm addTodo={addTodo} />
            <TodoFilter showCompleted={ShowCompleted} setShowCompleted={setShowCompleted} />
            {loading ? (
                <p style={{ textAlign: "center" }}>Loading...</p>
            ) : (
                <TodoList todos={displayedTodos} markTodoCompleted={markTodoCompleted} />
            )}
        </div>
    )
};