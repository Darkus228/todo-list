import { TodoItemType, ReduxAction } from '../../utils/types';

export default function (state: TodoItemType[] = [], action: ReduxAction<TodoItemType & { todo: TodoItemType }>): TodoItemType[] {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, { ...action.payload }];
        case 'ADD_SUBTODO':
        /* FIXME: THE CASE IS NOT HANDLE TODO NESTED DEEPLY
        * */
            return state.map((todo) => {
                if (todo.id === action.payload.id) {
                    action.payload.todo.children.push({ ...action.payload, id: todo.children.slice(-1)[0] ? todo.children.slice(-1)[0].id + 1 : 0 });
                }
                return todo;
            });
        case 'TOGGLE_TODO':
            return state.map((todo) => {
                if (todo.id === action.payload.id) {
                    todo.completed = !todo.completed;
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
