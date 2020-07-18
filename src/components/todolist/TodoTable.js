import React, {useState} from 'react';
import {connect} from 'react-redux';
import { getTodosByVisibilityFilter } from '../../redux/selectors';
import {deleteTodo, toggleTodo, setVisibilityFilter} from '../../redux/actions';
import { VisibilityFilters } from '../../redux/actionTypes';
import TodoRow from './TodoRow';

function TodoTable({ todoItems, toggleTodo, deleteTodo, setVisibilityFilter }) {

    const sortIcons = {
        SHOW_ALL: '❤️',
        SHOW_ACTIVE: '🧡',
        SHOW_COMPLETED: '💛'
    }

    const [sortIcon, setSortIcon] = useState(sortIcons.SHOW_ALL);

    const changeSortIcon = sortIcon => {
        switch (sortIcon) {
            case sortIcons.SHOW_ALL:
                setVisibilityFilter(VisibilityFilters.SHOW_ACTIVE);
                setSortIcon(sortIcons.SHOW_ACTIVE);
                break;
            case sortIcons.SHOW_ACTIVE:
                setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED);
                setSortIcon(sortIcons.SHOW_COMPLETED);
                break;
            case sortIcons.SHOW_COMPLETED:
            default:
                setVisibilityFilter(VisibilityFilters.SHOW_ALL);
                setSortIcon(sortIcons.SHOW_ALL);
        }
    };

    const todoItemRows = todoItems.map((todoItem, index) =>
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
            <div>{todoItemRows.length === 0 && 'No todos yet 🙃'}</div>
            <ol className="todo-items">{todoItemRows}</ol>
        </div>
    );
}

function mapStateToProps(state) {
    const { visibilityFilter } = state;
    return {
        todoItems: getTodosByVisibilityFilter(state, visibilityFilter)
    };
}

export default connect(mapStateToProps, { toggleTodo, deleteTodo, setVisibilityFilter })(TodoTable);