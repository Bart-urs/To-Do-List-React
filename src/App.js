import React, { useState, useEffect } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import './App.css';

function App() {
  const [edit, setEdit] = useState({ id: null, text: "" });

  const [todos, setTodos] = useState(() => {
    // Retrieving tasks from localStorage
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Side effect for saving tasks in localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text, dueDate = '') => {
    const newTodo = {
      id: Date.now(),
      text,
      isCompleted: false,
      dueDate,
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  const toggleComplete = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const updateDueDate = (id, newDueDate) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, dueDate: newDueDate };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const [filter, setFilter] = useState('all');

  const showAllTodos = () => setFilter('all');
  const showCompletedTodos = () => setFilter('completed');
  const showNotCompletedTodos = () => setFilter('notCompleted');

  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEdit({ id: todoToEdit.id, text: todoToEdit.text });
  };

  const handleEditInputChange = (e) => {
    setEdit({ ...edit, text: e.target.value });
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    const updatedTodos = todos.map((todo) =>
      todo.id === edit.id ? { ...todo, text: edit.text } : todo
    );
    setTodos(updatedTodos);
    setEdit({ id: null, text: "" }); // Reset edit state
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      {edit.id !== null ? (
        <form onSubmit={handleEditFormSubmit}>
          <input
            type="text"
            value={edit.text}
            onChange={handleEditInputChange}
          />
          <button type="submit">Save</button>
          <button onClick={() => setEdit({ id: null, text: "" })}>Cancel</button>
        </form>
      ) : (
        <>
          <AddTodoForm addTodo={addTodo} />
          <button onClick={showAllTodos}>Wszystkie</button>
          <button onClick={showCompletedTodos}>Zrealizowane</button>
          <button onClick={showNotCompletedTodos}>Nie zrealizowane</button>
          <TodoList
            todos={todos}
            toggleComplete={toggleComplete}
            removeTodo={removeTodo}
            updateDueDate={updateDueDate}
            editTodo={editTodo}
            filter={filter} 
          />
        </>
      )}
    </div>
  );
}

export default App;
