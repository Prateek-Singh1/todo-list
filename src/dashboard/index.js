import React, { useState, useEffect } from 'react'
import Cards from '../common/cards'
import "./Dashboard.css"
import AddTodo from '../components/addTodo'
import ArchiveItems from '../components/archiveTodo'

const Dashboard = () => {

    const [todos, setTodos] = useState([]);
    const [onAddingTodo, setOnAddingTodo] = useState(false);
    const [isArchiveOpen, setIsArchiveOpen] = useState(false);

    useEffect(() => {
        const getTodosFromLocalStorage = () => {
            const storedTodos = localStorage.getItem('todos');
            if (storedTodos) {
                setTodos(JSON.parse(storedTodos));
            }
        };
        getTodosFromLocalStorage();
    }, []);

    const handleAddTodo = () => {
        setOnAddingTodo(true);
    }

    const handleArchive = () => {
        setIsArchiveOpen(true);
    }
    const handleDeleteTodo = (index) => {
        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    const handleArchiveTodo = (index) => {
        const archivedTodo = todos[index];
        const updatedTodos = todos.filter((itemTodo, i) => i !== index);
        const archivedTodos = JSON.parse(localStorage.getItem('archivedTodos')) || [];
        archivedTodos.push(archivedTodo);
        localStorage.setItem('archivedTodos', JSON.stringify(archivedTodos));
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    const handleOnItemDelete = (todoIndex, labelIndex) => {
        const updatedTodos = [...todos];
        updatedTodos[todoIndex].label.splice(labelIndex, 1);
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    const handleShowTodoDetails = (title) => {
        window.location.href = `/todo-details/${(title)}`;
    };

    const handleOnChange = (todoIndex, labelIndex) => {
        const updatedTodos = [...todos];
        updatedTodos[todoIndex].label[labelIndex].isChecked = !updatedTodos[todoIndex].label[labelIndex].isChecked;
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    return (
        <section id='dashboard' className='dashboard-wrapper'>
            <div>
                <h1 onClick={handleAddTodo}>{window.innerWidth > 500 ? 'Click here to add todo' : 'Add to do'}</h1>
                <h1 onClick={handleArchive}>View Archive</h1>
            </div>
            <div>
                {onAddingTodo ?
                    <AddTodo onClick={() => setOnAddingTodo(false)} />
                    :
                    <></>
                }
                {todos.length !== 0 ?
                    todos.map((item, index) => {
                        return (
                            <Cards
                                title={item.title}
                                label={item.label}
                                noTitleClicked={() => handleShowTodoDetails(item.title)}
                                onDelete={() => handleDeleteTodo(index)}
                                onArchive={() => handleArchiveTodo(index)}
                                onChange={(labelIndex) => handleOnChange(index, labelIndex)}
                                onItemDelete={(labelIndex) => handleOnItemDelete(index, labelIndex)}
                            />
                        )
                    })
                    :
                    <></>
                }
                {isArchiveOpen ?
                    <ArchiveItems onClose={() => setIsArchiveOpen(false)} />
                    :
                    <></>
                }
            </div>
        </section>
    )
}

export default Dashboard