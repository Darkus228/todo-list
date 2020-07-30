import React, {useRef, useState} from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../redux/actions';

function AddTodoItemBar({ addTodo }) {
    const initialValue = '';
    const [value, setValue] = useState(initialValue);
    const inputEl = useRef(null);

    const handleChange = event => {
        const { value } = event.target;

        setValue(value);
    }

    const submitForm = (e) => {
        e.preventDefault();
        inputEl.current.focus();

        if (!value.trim()) return;

        addTodo(value);

        setValue(initialValue);
    }

    return (
        <div className="todo-add">
            <form className="todo-form" onSubmit={submitForm}>
                <label
                    className="todo-label"
                    htmlFor="task"
                >
                    Task:
                </label>
                <input
                    className="todo-text"
                    type="text" id="task"
                    placeholder="Enter a task..."
                    value={value}
                    onChange={handleChange}
                    ref={inputEl}
                    autoFocus
                />
                <input
                    className="todo-button"
                    type="submit"
                    value="Add"
                />
            </form>
        </div>
    );
}

export default connect(null, { addTodo })(AddTodoItemBar);
