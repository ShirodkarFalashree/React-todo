import { useState,useEffect } from 'react'
import { TodoProvider } from './context'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [...prev, { id: Date.now(), ...todo }])
  }

  const updateTodo = (id,todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, compleated: !prevTodo.compleated } : prevTodo
      ))
  }

  useEffect(() => {
    const todos=JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length>0){
      setTodos(todos)
    }
  }, [])
  
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])
  return (
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}} >
      <h1 className='mainHeading text-3xl'> --------------------------------<br /> customize your day❕<br /> -------------------------------- </h1>

      <div className='mainBox'>
        <div>
        {/* input form  */}
        <TodoForm />
        </div>
        {/* list */}
        <div>
          {
            todos.map((todo)=>(
              <div key={todo.id}>
                          <TodoItem todo={todo} />

              </div>
            ))
          }
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
