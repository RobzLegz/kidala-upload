import { SearchIcon } from '@heroicons/react/solid';
import React from 'react';
import { Input } from '../Input';

export interface SearchBarProps
    extends React.ComponentPropsWithoutRef<'input'> {
    inputClassName?: string;
    isLoading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
    inputClassName = '',
    isLoading = false,
    ...props
}) => {
    return (
        <div
            className={`items-center flex w-full bg-primary-700 text-primary-300 transition duration-200 ease-in-out focus-within:text-primary-100 rounded-lg px-4 ${props.className}`}
        >
            <SearchIcon className="text-white h-7" />

            <Input
                placeholder={props.placeholder}
                className={inputClassName}
                transparent
                {...props}
            />
        </div>
    );
};

export default SearchBar;
