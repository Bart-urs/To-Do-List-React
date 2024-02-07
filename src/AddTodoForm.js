import React, { useState } from 'react';

function AddTodoForm({ addTodo }) {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTodo(task); 
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Dodaj nowe zadanie..."
      />
      <button className="button-hover button-hover-new-post" type="submit">Dodaj Nowe Zadanie</button>
    </form>
  );
}

export default AddTodoForm;