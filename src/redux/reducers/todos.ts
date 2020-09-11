import { TodoItemType, ReduxAction } from '../../utils/types';

function todos(state: TodoItemType[] = [], action: ReduxAction<TodoItemType>): TodoItemType[] {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, { ...action.payload }];
        case 'ADD_SUBTODO':
            /* FIXME: THE CASE IS NOT HANDLE DEEPLY NESTED TODO
             * */
            return state.map((todo) => {
                if (todo.id === action.payload.id) {
                    return {
                        ...todo,
                        children: todo.children.concat({
                            ...action.payload,
                            id: todo.children.slice(-1)[0] ? todo.children.slice(-1)[0].id + 1 : 0,
                        }),
                    };
                }
                return todo;
            });
        case 'TOGGLE_TODO':
            return state.map((todo) => {
                if (todo.id === action.payload.id) {
                    return {
                        ...todo,
                        completed: !todo.completed,
                    }
                }
                return todo;
            });
        case 'CHANGE_TODO':
            return state.map((todo) => {
                if (todo.id === action.payload.id) {
                    todo.description = action.payload.description;
                }
                return todo;
            });
        default:
            return state;
    }
}

export default todos;
