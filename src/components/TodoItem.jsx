import React, { useState, useEffect } from 'react';
import './TodoItem.css';
import { useTodo } from '../context/TodoContext';

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  useEffect(() => {
    const doneStatus = localStorage.getItem(`todo_${todo.id}_done`);
    if (doneStatus === 'true') {
      setIsDone(true);
    }
  }, [todo.id]);

  useEffect(() => {
    localStorage.setItem(`todo_${todo.id}_done`, isDone ? 'true' : 'false');
  }, [isDone, todo.id]);

  const handleDone = () => {
    toggleComplete(todo.id);
    setIsDone(!isDone);
  };

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  return (
    <div className={`itemMain ${isDone ? 'done' : ''}`}>
      <button
        className='done'
        onClick={handleDone}
      >
        Done
      </button>
      <input
        type="text"
        className={`inputList`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      <button
        className='edit'
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            editTodo();
          } else {
            setIsTodoEditable((prev) => !prev);
          }
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "Save" : "Edit"}
      </button>
      <button
        className='del'
        onClick={() => deleteTodo(todo.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
