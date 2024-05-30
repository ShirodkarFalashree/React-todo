import React, { useState } from 'react'
import { useTodo } from '../context'
import './TodoForm.css'
function TodoForm() {
  const [todo,setTodo]=useState("")
  const {addTodo}=useTodo()

  const add = (e) => {
    e.preventDefault()

    if (!todo) return

    addTodo({ todo, completed: false})
    setTodo("")
  }
  return (
    <form action="" className='mainForm' onSubmit={add}>
        <input type="text"
         name="" 
         placeholder='Write todos here...' 
         className='inputBar'
         value={todo}
         onChange={(e) => setTodo(e.target.value)}

         />

        <button type='submit' className='addBtn'>
        Add Task
        </button>
    </form>
  )
}

export default TodoForm