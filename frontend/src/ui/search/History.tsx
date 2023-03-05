import SearchHistory from './SearchHistory';

export type HistoryItem = {
    id: string;
    term: string;
};

export interface HistoryProps {
    history: HistoryItem[];
    setTerm?: React.Dispatch<React.SetStateAction<string>>;
}

const History: React.FC<HistoryProps> = ({ history, setTerm }) => {
    const historyDeleteClickHandler = (id: string) => {
        return id;
    };

    return (
        <div className="flex flex-col w-full px-2">
            {history.map((h) => (
                <SearchHistory
                    onClickToDeleteSearchHistory={() =>
                        historyDeleteClickHandler(h.id)
                    }
                    key={h.id}
                    searchText={h.term}
                    setTerm={setTerm}
                />
            ))}
        </div>
    );
};

export default History;
