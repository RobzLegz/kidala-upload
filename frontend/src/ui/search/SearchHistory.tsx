import { SearchIcon } from '@heroicons/react/solid';
import React from 'react';

export interface SearchHistoryProps {
    onClickToDeleteSearchHistory: React.MouseEventHandler<HTMLSpanElement>;
    searchText: string;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({
    onClickToDeleteSearchHistory,
    searchText,
}) => {
    return (
        <div className={'flex flex-row py-2 px-4 w-full'}>
            <div className={'flex flex-1 items-center group cursor-pointer'}>
                <SearchIcon
                    className={
                        'mr-4 group-hover:text-primary-100 text-primary-300 h-6'
                    }
                />
                <span
                    className={'text-primary-300 group-hover:text-primary-100'}
                >
                    {searchText}
                </span>
            </div>
            <span
                onClick={onClickToDeleteSearchHistory}
                className={'text-accent underline cursor-pointer'}
            >
                Delete
            </span>
        </div>
    );
};

export default SearchHistory;
