import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './TodoDetails.css'

const TodoDetails = () => {
  const { title } = useParams();
  const [todo, setTodo] = useState(null);
  const [description, setDescription] = useState("");
  const [buttonStatus, setButtonStatus] = useState("Change")

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      const todos = JSON.parse(storedTodos);
      const filteredTodo = todos.find(todo => todo.title === title);
      setTodo(filteredTodo);
      setDescription(filteredTodo.description);
    }
  }, [title]);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setButtonStatus("Save")
  };

  const handleSaveDescription = () => {
    const updatedTodo = { ...todo, description: description };
    const updatedTodos = JSON.parse(localStorage.getItem('todos')).map(t => {
      if (t.title === updatedTodo.title) {
        return updatedTodo;
      }
      return t;
    });
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTodo(updatedTodo);
    setButtonStatus("Saved")
  };

  return (
    <section id='todo-page-details' className='page-details-wrapper'>
      {todo ? (
        <>
          <div className='page-details-title'>{todo.title}</div>
          <div className='page-details-description'>
            <div>
              <label>Description : </label>
              <input type="text" value={description} onChange={handleDescriptionChange} />
            </div>
            <button className='btn' onClick={handleSaveDescription}>{buttonStatus}</button>
          </div>
          <div className='page-details-items'>
            <ul>
              {todo.label.map((label, index) => (
                <li key={index}>
                  {label.content} - {label.isChecked ? 'Completed' : 'Yet to Do'}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div>Todo not found</div>
      )}
    </section>
  );
};

export default TodoDetails;
