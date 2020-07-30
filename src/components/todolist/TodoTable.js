import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getTodosByVisibilityFilter } from '../../redux/selectors';
import { deleteTodo, toggleTodo, setVisibilityFilter } from '../../redux/actions';
import { VisibilityFilters } from '../../redux/actionTypes';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TodoRow from './TodoRow';

const sortIcons = {
    SHOW_ALL: '❤️',
    SHOW_ACTIVE: '🧡',
    SHOW_COMPLETED: '💛'
}

function TodoTable({todoItems, toggleTodo, deleteTodo, setVisibilityFilter}) {
    const [sortIcon, setSortIcon] = useState(sortIcons.SHOW_ALL);

    const icons = Object.keys(sortIcons);

    const changeSortIcon = sortIcon => {
        let index = 0;
        for (const iconKey in sortIcons) {
            if (index + 1 < icons.length && sortIcons[iconKey] === sortIcon) {
                setVisibilityFilter(VisibilityFilters[icons[index + 1]]);
                setSortIcon(sortIcons[icons[index + 1]]);
                break;
            } else if (index + 1 === icons.length) {
                setVisibilityFilter(VisibilityFilters[icons[0]]);
                setSortIcon(sortIcons[icons[0]]);
                break;
            }
            index++;
        }
    };

    const todoItemRows = todoItems.map((todoItem, index) =>
        <CSSTransition
            key={index}
            classNames="example"
            timeout={{enter: 500, exit: 300}}
        >
            <TodoRow
                toggleTodo={toggleTodo}
                todoItem={todoItem}
                key={index}
                deleteTodo={deleteTodo}
            />
        </CSSTransition>
    );

    return (
        <div className="todo-table">
            <div>
                Filter
                <button className="todo-button" onClick={() => changeSortIcon(sortIcon)}><span
                    role="img">{sortIcon}</span></button>
            </div>
            <div>{todoItemRows.length === 0 && 'No todos yet 🙃'}</div>

            <ol className="todo-items">
                <TransitionGroup>
                    {todoItemRows}
                </TransitionGroup>
            </ol>

        </div>
    );
}

function mapStateToProps(state) {
    const {visibilityFilter} = state;
    return {
        todoItems: getTodosByVisibilityFilter(state, visibilityFilter)
    };
}

export default connect(mapStateToProps, {toggleTodo, deleteTodo, setVisibilityFilter})(TodoTable);