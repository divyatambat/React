import { TodoFilter } from "./TodoFilter"
import { TodoList } from "./TodoList"
import "./style.css"
import { useCallback, useState } from "react"
import { GetTodosResponse } from "../types/type"
import { getTodos } from "../services/todos.services"
import { useQuery, useQueryClient } from "react-query"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"

export const TodoApp = () => {
    const queryClient = useQueryClient()
    const pageSize = 8
    const [pageNumber, setPageNumber] = useState(1)
    const [showCompleted, setShowCompleted] = useState(false)

    const {
        data: todos,
        isLoading,
        error,
    } = useQuery<GetTodosResponse, AxiosError>(["todos", pageNumber, showCompleted], () => {
        return getTodos({
            _page: pageNumber,
            _limit: pageSize,
            completed: showCompleted ? true : undefined,
        })
    })

    const markTodoCompleted = useCallback((id: number, completed: boolean) => { }, [])
    const toggleShowCompleted = () => {
        setShowCompleted(!showCompleted)
    }

    const navigate = useNavigate()
    return (
        <div className="add-todo-button" style={{ padding: 14 }}>
            <button onClick={() => navigate("/todos/create")}>Create Todo</button>
            <TodoFilter showCompleted={showCompleted} setShowCompleted={toggleShowCompleted} />
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <h4>{error.message}</h4>
            ) : (
                <TodoList todos={todos || []} markTodoCompleted={markTodoCompleted} />
            )}
            <div className="pagination-buttons">
                <button onClick={() => setPageNumber(Math.max(1, pageNumber - 1))} disabled={pageNumber === 1}>
                    Prev
                </button>
                <span>
                    Page {pageNumber} of {todos?.length ? Math.ceil((todos?.length || 0) / pageSize) : 1}
                </span>
                <button onClick={() => setPageNumber(Math.min(Math.ceil(todos?.length || 0 / pageSize), pageNumber + 1))} disabled={pageNumber === Math.ceil(todos?.length || 0 / pageSize)}>
                    Next
                </button>
            </div>
        </div>
    );
};
