import React from 'react';
import { Story } from '@storybook/react';
import SearchResult, { SearchResultProps } from '../../ui/search/SearchResult';
import { FileInterface } from '../../interfaces/file';

export default {
    title: 'search/components/SearchResult',
    component: SearchResult,
};

const searchHistoryProps: SearchResultProps = {
    file: {
        name: 'izlasi.pptx',
        hash: 'sd9fh8fgh203g6d9873fgfg3f3279d',
        size: 121798,
    } as FileInterface,
};

export const Main: Story<SearchResultProps> = ({ ...props }) => (
    <SearchResult file={props.file || searchHistoryProps.file} />
);

Main.bind({});
