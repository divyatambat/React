import "./style.css";

export const TodoFilter = ({
    setShowCompleted,
    showCompleted
}: {
    showCompleted: boolean,
    setShowCompleted: (ShowCompleted: boolean) => void
}) => {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <input type="checkbox" id="filter" onChange={(e) => setShowCompleted(e.target.checked)} />
            <label htmlFor="filter">Completed</label>
        </div>
    )
}

