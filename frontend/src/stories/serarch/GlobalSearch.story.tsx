import React from 'react';
import { Story } from '@storybook/react';
import GlobalSearch, { GlobalSearchProps } from '../../ui/search/GlobalSearch';
import { FileInterface } from '../../interfaces/file';
import { HistoryItem } from '../../ui/search/History';

export default {
    title: 'search/GlobalSearch',
    component: GlobalSearch,
};

const history: HistoryItem[] = [
    { id: '1', term: 'javascript' },
    { id: '2', term: 'react graphql' },
    { id: '3', term: 'español' },
    { id: '4', term: 'elon musk interview' },
    { id: '5', term: 'elon muk' },
];

const searchResults: FileInterface[] = [
    {
        _id: "123213",
        likes: [],
        name: 'Insane.mp4',
        hash: 'da7c4174d96171cf35ea8f1d3d6567d9',
        size: 1229201,
        author: '',
        email: '',
        phoneNumber: '',
        private: false,
        is_ad: false,
        tag: [],
        description: 'sasgdbasd sauhdusva uogdvas vodsauvd uasd',
    } as FileInterface,
];

const globalSearchProps: GlobalSearchProps = {
    history,
    searchResults,
};

export const Main: Story<GlobalSearchProps> = ({ ...props }) => (
    <GlobalSearch
        history={props.history || globalSearchProps.history}
        searchResults={props.searchResults || searchResults}
    />
);

Main.bind({});
