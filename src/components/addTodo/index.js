import React, { useState } from 'react';
import "./AddTodo.css"
import Modal from '../../common/modal';

const AddTodo = ({ onClick }) => {
    const [title, setTitle] = useState('');
    const [todoItems, setTodoItems] = useState([]);
    const [description, setDescription] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleTodoItemChange = (event, index) => {
        const updatedTodoItems = [...todoItems];
        updatedTodoItems[index] = { content: event.target.value, isChecked: false };
        setTodoItems(updatedTodoItems);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleAddTodoItem = () => {
        setTodoItems([...todoItems, { content: '', isChecked: false }]);
    };

    const handleSubmit = () => {
        const todo = {
            title: title,
            label: todoItems,
            description: description
        };

        const existingTodos = JSON.parse(localStorage.getItem('todos')) || [];

        existingTodos.push(todo);

        localStorage.setItem('todos', JSON.stringify(existingTodos));

        setTitle('');
        setTodoItems([]);
        setDescription('');
        window.location.reload();
        onClick();
    };

    return (
        <Modal onClose={() => onClick()}>
            <section id='add-todo' className='addTodo-wrapper'>
                <div>
                    <label>Title: &nbsp;</label>
                    <input type="text" value={title} onChange={handleTitleChange} />
                    <br />
                    <br />
                    <div>
                        <label>Description: &nbsp;</label>
                        <input type="text" value={description} onChange={handleDescriptionChange} />
                    </div>
                </div>
                {todoItems.map((item, index) => (
                    <div key={index}>
                        <label>Todo Item:</label>
                        <input type="text" value={item.content} onChange={(event) => handleTodoItemChange(event, index)} />
                    </div>
                ))}
                <button className='btn' style={{ background: 'rgb(242, 242, 242)' }} onClick={handleAddTodoItem}>Add Item</button>

                <button className='btn' style={{ background: 'rgb(249, 109, 0)', color: "white" }} onClick={handleSubmit}>Submit</button>
            </section>
        </Modal>
    );
};

export default AddTodo;
