import React from 'react';
import { Story } from '@storybook/react';
import { FileInterface } from '../../interfaces/file';
import History, { HistoryItem, HistoryProps } from '../../ui/search/History';
import SearchHistory from '../../ui/search/SearchHistory';

export default {
    title: 'search/History',
    component: History,
};

const history: HistoryItem[] = [
    { id: '1', term: 'javascript' },
    { id: '2', term: 'react graphql' },
    { id: '3', term: 'español' },
    { id: '4', term: 'elon musk interview' },
    { id: '5', term: 'elon muk' },
];

export const Main: Story<HistoryProps> = () => <History history={history} />;

Main.bind({});
