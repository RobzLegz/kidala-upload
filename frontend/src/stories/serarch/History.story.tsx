import React from 'react';
import { Story } from '@storybook/react';
import History, { HistoryItem, HistoryProps } from '../../ui/search/History';

export default {
    title: 'search/components/History',
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
