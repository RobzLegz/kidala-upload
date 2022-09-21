import { FileInterface } from '../../interfaces/file';
import { getFileExtension } from '../../utils/getFileExtension';
import BubbleText from '../BubbleText';

export interface SearchResultProps {
    file: FileInterface;
    className?: string;
    onClick?: () => void;
}

const SearchResult: React.FC<SearchResultProps> = ({
    file,
    className = '',
    onClick = () => undefined,
}) => {
    return (
        <div
            className={`flex cursor-pointer hover:bg-primary-700 px-4 py-3 w-full rounded-8 ${className}`}
            onClick={onClick}
        >
            <div className="flex flex-col w-full">
                <div className="flex w-full">
                    <span className="text-primary-100 font-bold flex-1 items-center">
                        {file.name}
                    </span>

                    <BubbleText live>{getFileExtension(file.name)}</BubbleText>
                </div>
            </div>
        </div>
    );
};

export default SearchResult;
