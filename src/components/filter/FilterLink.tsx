import React from 'react';
import { useDispatch } from 'react-redux';
import { setVisibilityFilter } from '../../redux/filterSlice';
import { VisibilityFilter } from '../../utils/types';

const FilterLink = ({ children, filter }: { 
    children: string, 
    filter: VisibilityFilter 
}): JSX.Element => {
    const dispatch = useDispatch();
    return (
        <button
            className="mx-1 focus:text-green-700"
            onClick={(): void => { dispatch(setVisibilityFilter(filter)) }}
        >
            {children}
        </button>
    );
};

export default FilterLink;