import { TodoItemType, ReduxAction } from '../../utils/types';

export default function (state: TodoItemType[] = [], action: ReduxAction<TodoItemType>): TodoItemType[] {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, { ...action.payload }];
        case 'TOGGLE_TODO':
            return state.map((todo) => {
                if (todo.id === action.payload.id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            });
        default:
            return state;
    }
}
