import SearchHistory from "./SearchHistory";

export type HistoryItem = {
    id: string;
    term: string;
};


export interface HistoryProps {
    history: HistoryItem[];
}

const History: React.FC<HistoryProps> = ({ history }) => {
    const historyDeleteClickHandler = (id: string) => {
        return id;
    };

    return (
        <div className="flex flex-col w-full">
            {history.map((h) => (
                <SearchHistory
                    onClickToDeleteSearchHistory={() =>
                        historyDeleteClickHandler(h.id)
                    }
                    key={h.id}
                    searchText={h.term}
                />
            ))}
        </div>
    );
};

export default History;
