import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../redux/actions';

function AddTodoItemBar({ addTodo }) {
    const initialState = {value: ''};
    const [state, setState] = useState(initialState);


    const handleChange = event => {
        const { value } = event.target;
        setState({ value });
    }

    const submitForm = () => {
        if (!state.value.trim()) return;

        addTodo(state.value);

        setState(initialState);
    }

    return (
        <div className="todo-add">
            <form className="todo-form">
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
                    value={state.value}
                    onChange={handleChange}
                />
                <input
                    className="todo-button"
                    type="button"
                    value="Add"
                    onClick={submitForm}/>
            </form>
        </div>
    );
}

export default connect(null, { addTodo })(AddTodoItemBar);
