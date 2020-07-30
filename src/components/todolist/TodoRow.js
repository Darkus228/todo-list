import React from 'react';

function TodoRow({todoItem, toggleTodo, deleteTodo}) {
    return (
        <li className="todo-item">
            <input
                type="checkbox"
                checked={todoItem.completed}
                onChange={() => toggleTodo(todoItem.id)}
            />
            <span className={(todoItem.completed && 'todo-done') || undefined}>
                {todoItem.value}
            </span>
            <button
                className="todo-button remove"
                onClick={() => deleteTodo(todoItem.id)}
            >
                <span role="img" aria-label="emoji">✖️</span>
            </button>
        </li>
    );
}

export default TodoRow;