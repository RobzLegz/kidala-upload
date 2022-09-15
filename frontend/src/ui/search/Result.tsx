import { FileInterface } from '../../interfaces/file';
import SearchResult from './SearchResult';

export interface SearchResultProps {
    items: FileInterface[];
}

const Result: React.FC<SearchResultProps> = ({ items }) => {
    return (
        <div className="flex flex-col w-full">
            {items.map((result, i) => (
                <SearchResult file={result} key={i} />
            ))}
        </div>
    );
};

export default Result;
