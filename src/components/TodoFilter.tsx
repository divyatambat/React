import { memo } from "react"
import "./style.css"

export const TodoFilterComponent = ({
    setShowCompleted,
    showCompleted,
}: {
    showCompleted: boolean
    setShowCompleted: (showCompleted: boolean) => void
}) => {
    return (
        <div>
            <input
                type="checkbox"
                id="filter"
                checked={showCompleted}
                onChange={(e) => setShowCompleted(e.target.checked)}
            />
            <label htmlFor="filter">Show completed todos</label>
        </div>
    )
}

export const TodoFilter = memo(TodoFilterComponent)