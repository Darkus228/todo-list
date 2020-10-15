import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterType, VisibilityFilter } from '../utils/types';

const filterSlice = createSlice({
    name: 'filter',
    initialState: VisibilityFilter.ALL,
    reducers: {
        setVisibilityFilter(state: FilterType, action: PayloadAction<VisibilityFilter>): VisibilityFilter {
            return action.payload;
        },
    },
});

export const { setVisibilityFilter } = filterSlice.actions;

export default filterSlice.reducer;
