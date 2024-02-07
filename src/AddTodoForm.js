import React, { useState } from 'react';

function AddTodoForm({ addTodo }) {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTodo(task); // Użyj funkcji addTodo przekazanej jako prop
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
      <button className="button-hover" type="submit">Dodaj Nowe Zadanie</button>
    </form>
  );
}

export default AddTodoForm;