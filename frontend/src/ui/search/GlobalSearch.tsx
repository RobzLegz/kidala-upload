import React, { useState } from 'react';
import { FileInterface } from '../../interfaces/file';
import SearchBar from './SearchBar';
import SearchOverlay from './SearchOverlay';
import History, { HistoryItem } from './History';
import Result from './Result';

export interface GlobalSearchProps {
    history: HistoryItem[];
    searchResults: FileInterface[];
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({
    history,
    searchResults,
}) => {
    const [focused, setFocused] = useState(false);
    const [term, setTerm] = useState('');

    const setSearchTerm = ({
        currentTarget: { value },
    }: React.FormEvent<HTMLInputElement>) => setTerm(value);
    const focusHandler = () => setFocused(true);
    const blurHandler = () => setFocused(false);

    return (
        <div className="flex w-full relative">
            <div className="flex relative z-10 w-full p-2">
                <SearchBar
                    className="mb-2"
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                    onChange={setSearchTerm}
                />
            </div>
            {focused && (
                <SearchOverlay className="absolute z-0">
                    <div className="flex flex-col w-full">
                        {!term && history && <History history={history} />}
                        {term && searchResults && (
                            <Result items={searchResults} />
                        )}
                    </div>
                </SearchOverlay>
            )}
        </div>
    );
};

export default GlobalSearch;
