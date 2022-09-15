import React from 'react';

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
            className={`items-center flex w-full bg-primary-700 text-primary-300 transition duration-200 ease-in-out focus-within:text-primary-100 rounded-lg ${props.className}`}
        >
            burh
        </div>
    );
};

export default SearchBar;
