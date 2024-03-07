import { useState } from "react"

export const AddTodoForm = ({ addTodo }: { addTodo: (title: string) => void }) => {
    const [addTodoInput, setAddTodoInput] = useState("")

    return (
        <div className="d-flex gap-2">
            <input type="text" value={addTodoInput} onChange={(e) => setAddTodoInput(e.target.value)} />
            <button onClick={() => addTodo(addTodoInput)}>+</button>
        </div>
    )
}