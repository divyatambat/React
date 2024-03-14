import { memo, useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import { postTodo } from "../services/todos.services"

const AddTodoFormComponent = () => {
    const navigate = useNavigate()
    const [addTodoInput, setAddTodoInput] = useState("")
    const [addDueDate, setAddDueDate] = useState("")
    const queryClient = useQueryClient()
    const { mutate: postTodoMutate, isLoading: postTodoLoading } = useMutation(postTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries("todos")
            navigate(-1)
        },
    })

    const addTodo = (title: string) => {
        postTodoMutate({
            title: title,
            completed: false,
            duedate: ""
        })
    }

    return (
        <div className="d-flex gap-2">
            <input type="text" value={addTodoInput} placeholder="Add todo..." onChange={(e) => setAddTodoInput(e.target.value)}
                style={{ margin: "50px" }} />

            <input type="date" value={addDueDate} onChange={(e) => setAddDueDate(e.target.value)}
                style={{ margin: "50px" }} />

            <button style={{ margin: "50px" }} onClick={() => addTodo(addTodoInput)} disabled={postTodoLoading}>
                {postTodoLoading ? "Loading..." : "+"}
            </button>
        </div>
    )
}

export const AddTodoForm = memo(AddTodoFormComponent)