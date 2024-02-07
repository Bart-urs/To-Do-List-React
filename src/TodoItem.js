import React from 'react';
import './App.css'; 

function TodoItem({
  todo,
  toggleComplete,
  removeTodo,
  editTodo,
  toggleImportant,
  toggleSelect,
}) {
  function handleToggleComplete() {
    toggleComplete(todo.id);
  }

  function handleToggleImportant() {
    toggleImportant(todo.id);
  }

  return (
    <li className={`todo-item ${todo.isImportant ? 'todo-item-important' : ''}`}>
      <div className="todo-text-content">
        <input
          type="checkbox"
          checked={todo.isSelected || false} 
          onChange={() => toggleSelect(todo.id)}
        />
        <span
          className={`todo-text ${todo.isCompleted ? 'completed' : ''}`}
          title={todo.text}
        >
          {todo.text}
        </span>
      </div>
      <div className="todo-buttons">
        <button
          className={`todo-done-button button-hover ${todo.isCompleted ? 'todo-done' : ''}`}
          onClick={handleToggleComplete}
        >
          Zrealizowane
        </button>
        <button
          className="todo-edit-button button-hover"
          onClick={() => editTodo(todo.id)}
        >
          Edytuj
        </button>
        <button
          className="todo-remove-button button-hover"
          onClick={() => removeTodo(todo.id)}
        >
          Usuń
        </button>
        <button
          className={`todo-important-button ${todo.isImportant ? 'button-important' : 'button-hover'}`}
          onClick={handleToggleImportant}
        >
          {todo.isImportant ? 'Nie ważne' : 'Ważne'}
        </button>
      </div>
    </li>
  );
}

export default TodoItem;