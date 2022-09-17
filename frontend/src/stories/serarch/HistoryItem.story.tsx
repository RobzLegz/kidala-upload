import React from 'react';
import { Story } from '@storybook/react';
import SearchHistory, {
    SearchHistoryProps,
} from '../../ui/search/SearchHistory';
import { toStr } from '../utils/toStr';

export default {
    title: 'search/SearchHistory',
    component: SearchHistory,
};

const searchHistoryProps: SearchHistoryProps = {
    onClickToDeleteSearchHistory: () => undefined,
    searchText: 'sussy',
};

export const Main: Story<SearchHistoryProps> = ({ ...props }) => (
    <SearchHistory
        onClickToDeleteSearchHistory={
            props.onClickToDeleteSearchHistory ||
            searchHistoryProps.onClickToDeleteSearchHistory
        }
        searchText={props.searchText || searchHistoryProps.searchText}
    />
);

Main.argTypes = {
    searchText: toStr(),
};

Main.bind({});
