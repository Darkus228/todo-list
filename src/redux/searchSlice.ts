import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const searchSlice = createSlice({
    name: 'search',
    initialState: '',
    reducers: {
        setSearchValue(state: string, action: PayloadAction<string>): string {
            return action.payload;
        }
    }
});

export const { setSearchValue } = searchSlice.actions;

export default searchSlice.reducer;