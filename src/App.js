import React, { useState, useEffect, useCallback } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import './App.css';

function App() {
  const [edit, setEdit] = useState({ id: null, text: "" });
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [isAnyTodoSelected, setIsAnyTodoSelected] = useState(false);
  const updateSelectionState = useCallback(() => {
    setIsAnyTodoSelected(todos.some(todo => todo.isSelected));
  }, [todos]);
  function toggleSelect(id) {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, isSelected: !todo.isSelected } : todo
      )
    );
  }
  function removeSelectedTodos() {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.isSelected));
  }
useEffect(() => {
  updateSelectionState();
});
useEffect(() => {
  updateSelectionState();
}, [todos, updateSelectionState]);
useEffect(() => {
  const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
  const updatedTodos = storedTodos.map(todo => ({
    ...todo,
    tags: todo.tags || [] 
  }));
  setTodos(updatedTodos);
}, []);
useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);
  const addTodo = (text, dueDate = '') => {
    const newTodo = {
      id: Date.now(),
      text,
      isCompleted: false,
      dueDate,
      tags: [], 
      isImportant: false, 
    };
    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
  };
  const toggleImportant = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isImportant: !todo.isImportant };
      }
      return todo;
    }));
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
    setEdit({ id: null, text: "" }); 
  };
  const showImportantTodos = () => setFilter('important');

  const filterTodos = useCallback(() => {
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.isCompleted);
      case 'notCompleted':
        return todos.filter(todo => !todo.isCompleted);
      case 'important':
        return todos.filter(todo => todo.isImportant);
      default:
        return todos;
    }
  }, [filter, todos]);
  return (
    <div className="App">
      <h1>To-Do List React</h1>
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
          <button className="button-hover" onClick={showAllTodos}>Wszystkie</button>
          <button className="button-hover" onClick={showImportantTodos}>Ważne</button>
          <button className="button-hover" onClick={showCompletedTodos}>Zrealizowane</button>
          <button className="button-hover" onClick={showNotCompletedTodos}>Nie zrealizowane</button>
          <button
            className={`button-hover ${isAnyTodoSelected ? 'button-active' : ''}`}
            onClick={removeSelectedTodos}
            disabled={!isAnyTodoSelected} >
            Usuń zaznaczone
          </button>
          <TodoList
            todos={filterTodos()}
            setTodos={setTodos}
            toggleComplete={toggleComplete}
            removeTodo={removeTodo}
            updateDueDate={updateDueDate}
            editTodo={editTodo}
            toggleImportant={toggleImportant}
            toggleSelect={toggleSelect} 
            filter={filter}
            updateSelectionState={updateSelectionState}
          />
        </>
      )}
    </div>
  );
}
export default App;
