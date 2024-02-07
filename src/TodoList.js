import React from 'react';
import TodoItem from './TodoItem';
function TodoList({
  todos,
  setTodos,
  toggleComplete,
  removeTodo,
  updateDueDate,
  editTodo,
  toggleImportant,
  toggleSelect,
  filter
}) {
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') {
      return todo.isCompleted;
    } else if (filter === 'notCompleted') {
      return !todo.isCompleted;
    }
    return true;
  });
  return (
    <>
      <ul>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id + todo.isImportant}
            todo={todo}
            toggleSelect={toggleSelect}
            toggleComplete={() => toggleComplete(todo.id)}
            removeTodo={() => removeTodo(todo.id)}
            updateDueDate={(date) => updateDueDate(todo.id, date)}
            editTodo={(text) => editTodo(todo.id, text)}
            toggleImportant={() => toggleImportant(todo.id)}
          />
        ))}
      </ul>
    </>
  );
}
export default TodoList;