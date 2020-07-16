import React from 'react';
import TodoRow from './TodoRow';
import {connect} from "react-redux";
import {deleteTodo, toggleTodo} from "../../redux/actions";

function TodoTable({ todoItems, toggleTodo, deleteTodo, sortIcons, sortIcon, changeSortIcon }) {
    const copyTodoItems = [...todoItems];

    const filteredTodoItems = () => {
        switch (sortIcon) {
            case sortIcons.active:
                return copyTodoItems.filter(todoItem => !todoItem.completed);
            case sortIcons.completed:
                return copyTodoItems.filter(todoItem => todoItem.completed);
            default:
                return copyTodoItems;
        }
    };

    const todoItemRows = filteredTodoItems().map((todoItem, index) =>
        <TodoRow
            toggleTodo={toggleTodo}
            todoItem={todoItem}
            key={index}
            deleteTodo={deleteTodo}
        />
    );

    return (
        <div className="todo-table">
            <div>
                Filter
                <button className="todo-button" onClick={() => changeSortIcon(sortIcon)}><span role="img">{sortIcon}</span></button>
            </div>
            <div>{todoItems.length === 0 && 'No todos yet 🙃'}</div>
            <ol className="todo-items">{todoItemRows}</ol>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        todoItems: state.todos
    };
}

function mapDispatchToProps(dispatch) {
    return {
        toggleTodo: id => dispatch(toggleTodo(id)),
        deleteTodo: id => dispatch(deleteTodo(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoTable);