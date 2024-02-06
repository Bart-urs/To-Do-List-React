import React from 'react';
import './App.css'; // Upewnij się, że plik CSS jest zaimportowany

function TodoItem({ todo, toggleComplete, removeTodo, editTodo }) {
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.isCompleted}
        onChange={handleToggleComplete}
      />
      <span
        className={`todo-text ${todo.isCompleted ? 'completed' : ''}`}
        title={todo.text} // Dodaj ten atrybut, aby wyświetlić pełną treść zadania
      >
        {todo.text}
      </span>
      <button
        className="todo-edit-button"
        onClick={() => editTodo(todo.id)}
      >
        Edytuj
      </button>
      <button
        className="todo-remove-button"
        onClick={() => removeTodo(todo.id)}
      >
        Usuń
      </button>
    </li>
  );

  function handleToggleComplete() {
    toggleComplete(todo.id);
  }
}

export default TodoItem;