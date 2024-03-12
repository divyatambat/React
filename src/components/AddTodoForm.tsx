import { memo, useState } from "react"
import "./style.css";

export const AddTodoFormComponent = ({ addTodo }: { addTodo: (title: string, duedate: string) => void }) => {
    const [addTodoInput, setAddTodoInput] = useState("")
    const [addTodoDate, setAddTodoDate] = useState("")


    return (
        <div className="d-flex gap-2">
            <input type="text" value={addTodoInput} onChange={(e) => setAddTodoInput(e.target.value)} />
            <input type="date" value={addTodoDate} onChange={(e) => setAddTodoDate(e.target.value)} />
            <button onClick={() => addTodo(addTodoInput, addTodoDate)}>+</button>
        </div>
    )
}

export const AddTodoForm = memo(AddTodoFormComponent)