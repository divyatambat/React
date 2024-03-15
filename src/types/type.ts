export interface TodoItem {
    id: number
    title: string
    duedate: string
    isCompleted: boolean
}

//Get All Todos - getTodos
export interface GetTodosParams {
    _page?: number
    _limit?: number
    _sort?: "id" | "title" | "duedate" | "completed"
    _order?: "asc" | "desc"
    completed?: true
    title_like?: string
}

export type GetTodosResponse = TodoItem[]

//Get Todo By ID
export type GetTodoResponse = TodoItem

//Patch Todo
export interface PatchTodoBody {
    title?: string
    duedate?: string
    completed?: boolean
}

export type PatchTodoResponse = TodoItem

//Post Todo
export interface PostTodoBody {
    title: string
    duedate: string
    completed: boolean
}

export type PostTodoResponse = TodoItem