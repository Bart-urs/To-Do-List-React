import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, toggleComplete, removeTodo, updateDueDate, editTodo, filter }) {
  // Dodajemy logikę filtrowania zadań
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') {
      return todo.isCompleted;
    } else if (filter === 'notCompleted') {
      return !todo.isCompleted;
    }
    return true; // Jeśli filter === 'all', zwracamy wszystkie zadania
  });

  return (
    <ul>
      {filteredTodos.map((todo) => ( // Używamy filteredTodos zamiast todos
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={() => toggleComplete(todo.id)}
          removeTodo={() => removeTodo(todo.id)}
          updateDueDate={updateDueDate}
          editTodo={editTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;