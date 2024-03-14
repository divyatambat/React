import { memo } from "react"
import { Link } from "react-router-dom"

const TodoListItemComponent = ({
    completed,
    duedate,
    title,
    id,
    markTodoCompleted,
}: {
    completed: boolean
    duedate: string
    title: string
    id: number
    markTodoCompleted: (id: number, completed: boolean) => void
}) => {
    return (
        <li>
            <input style={{ margin: "10px" }}
                type="checkbox"
                checked={completed}
                onChange={(e) => {
                    markTodoCompleted(id, e.target.checked)
                }}
            ></input>
            <Link to={`/todos/${id}`}>{title}</Link>
            <label>{duedate}</label>
        </li>
    )
}

export const TodoListItem = memo(TodoListItemComponent)