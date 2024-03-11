import { memo, useEffect, useState } from "react"
import "./style.css";

export const AddTodoFormComponent = ({ addTodo }: { addTodo: (title: string, duedate: string) => void }) => {
    const [addTodoInput, setAddTodoInput] = useState("")
    const [addTodoDate, setAddTodoDate] = useState("")
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        setIsButtonDisabled(!addTodoInput || !addTodoDate);
    }, [addTodoInput, addTodoDate]);

    return (
        <div className="d-flex gap-2">
            <input type="text" value={addTodoInput} onChange={(e) => setAddTodoInput(e.target.value)} />
            <input type="date" value={addTodoDate} onChange={(e) => setAddTodoDate(e.target.value)} />
            <button disabled={isButtonDisabled} onClick={() => addTodo(addTodoInput, addTodoDate)} style={{ filter: isButtonDisabled ? "blur(1px)" : "none" }}>
                {isButtonDisabled ? "+" : "+"}
            </button>
        </div>
    )
}

export const AddTodoForm = memo(AddTodoFormComponent)