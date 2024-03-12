import { memo } from "react";
import "./style.css";

export const TodoFilterComponent = ({
    setShowCompleted,
    showCompleted
}: {
    showCompleted: boolean,
    setShowCompleted: (ShowCompleted: boolean) => void
}) => {
    return (
        <div>
            <input type="checkbox" id="filter" onChange={(e) => setShowCompleted(e.target.checked)} />
            <label htmlFor="filter">Completed</label>
        </div>
    )
}

export const TodoFilter = memo(TodoFilterComponent)