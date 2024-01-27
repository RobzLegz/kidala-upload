import React, { useState } from 'react';
import { FileInterface } from '../../interfaces/file';
import SearchBar from './SearchBar';
// import SearchOverlay from './SearchOverlay';
import History, { HistoryItem } from './History';
import Result from './Result';

export interface GlobalSearchProps {
    history: HistoryItem[];
    searchResults: FileInterface[];
    term?: string;
    setTerm?: React.Dispatch<React.SetStateAction<string>>;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({
    history,
    searchResults,
    setTerm,
    term,
}) => {
    const [focused, setFocused] = useState(false);

    const setSearchTerm = ({
        currentTarget: { value },
    }: React.FormEvent<HTMLInputElement>) => setTerm && setTerm(value);
    const focusHandler = () => setFocused(true);
    const blurHandler = () => setFocused(false);

    return (
        <div className="flex w-full relative">
            <div className="flex relative z-10 w-full">
                <SearchBar
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                    onChange={setSearchTerm}
                    placeholder="Search for files..."
                    value={term}
                />
            </div>
            {/* {focused && (
                <SearchOverlay className="absolute z-0">
                    <div className="flex flex-col w-full">
                        {!term && history && <History history={history} setTerm={setTerm} />}
                        {term && searchResults && (
                            <Result items={searchResults} />
                        )}
                    </div>
                </SearchOverlay>
            )} */}
        </div>
    );
};

export default GlobalSearch;
