import { TodoItem } from "../types/type"
import { TodoListItems } from "./TodoListItems"

export const TodoList = (props: {
    todos: TodoItem[], markTodoCompleted: (id: number, completed: boolean) => void
}) => {
    return (
        <div>
            <h3>TODO List</h3>
            <ul>
                {props.todos.map((todo) => (
                    <TodoListItems id={todo.id} completed={todo.completed} title={todo.title} markTodoCompleted={props.markTodoCompleted} />
                ))}
            </ul>
        </div>
    )
}