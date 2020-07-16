import React, {useState} from 'react';
import FilterableTodoTable from './todolist/FilterableTodoTable';

function Main() {
    const sortIcons = {
        default: '❤️',
        active: '🧡',
        completed: '💛'
    }

    const [sortIcon, setSortIcon] = useState(sortIcons.default);

    const changeSortIcon = sortIcon => {
        switch (sortIcon) {
            case sortIcons.active:
                setSortIcon(sortIcons.completed);
                break;
            case sortIcons.completed:
                setSortIcon(sortIcons.default);
                break;
            default:
                setSortIcon(sortIcons.active);
        }
    };

    return (
        <main className="main">
            <FilterableTodoTable
                sortIcon={sortIcon}
                sortIcons={sortIcons}
                changeSortIcon={changeSortIcon}
            />
        </main>
    );
}

export default Main;