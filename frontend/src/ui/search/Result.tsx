import { FileInterface } from '../../interfaces/file';
import SearchResult from './SearchResult';

export interface ResultProps {
    items: FileInterface[];
}

const Result: React.FC<ResultProps> = ({ items }) => {
    return (
        <div className="flex flex-col w-full px-2">
            {items.map((result, i) => (
                <SearchResult file={result} key={i} />
            ))}
        </div>
    );
};

export default Result;
