import ReactDOM from "react-dom/client"
import "./index.css"
import { TodoApp } from "./components/TodoApp"
import { QueryClient, QueryClientProvider, useQuery } from "react-query"
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom"
import { getTodo } from "./services/todos.services"
import { AddTodoForm } from "./components/AddTodoForm"
import { useEffect, useState } from "react"

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 3000 } } })

const About = () => {
  return (
    <div>
      <header style={{ backgroundColor: "#f0f0f0", color: "black", padding: "30px" }}>
        <h1 style={{ textAlign: "left" }}>TodoApp</h1>
        <div style={{ display: "flex", gap: "50px" }}>
          <Link to="/todos">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
      </header>
      <div>
        <div style={{ padding: "30px" }} >
          <Outlet />
        </div>
      </div>
    </div>
  )
}

const TodoPage = () => {
  let params = useParams()
  const id = parseInt(params.todoId!)
  const { data: todo, isLoading, error } = useQuery(["todo", id], () => getTodo(id))

  return (
    <div>
      <h4>Todo Page for ID: {id}</h4>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Invalid todo id in url: {params.todoId}</p>
      ) : (
        <>
          <p>{todo?.title}</p>
          <p>Status: {todo?.isCompleted ? "Complete" : "Pending"}</p>
        </>
      )}
    </div>
  )
}

const ProtectedRoute = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      const isLoggedIn = Math.random() > 0.5
      if (!isLoggedIn) {
        navigate("/todos")
      } else {
        setLoading(false)
      }
    }, 2000)
  }, [])

  if (loading) return <p>Loading...</p>
  return (
    <>
      <Outlet />{" "}
    </>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<About />}>
            <Route path="todos" element={<TodoApp />} />
            <Route element={<ProtectedRoute />}>
              <Route path="todos/:todoId" element={<TodoPage />} />
              <Route path="todos/create" element={<AddTodoForm />} />
            </Route>
            <Route path="about" element={<h2>About us page</h2>} />
            <Route path="contact" element={<h2>Contact us page</h2>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(<App />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
