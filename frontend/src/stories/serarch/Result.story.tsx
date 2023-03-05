import React from 'react';
import { Story } from '@storybook/react';
import { FileInterface } from '../../interfaces/file';
import Result, { ResultProps } from '../../ui/search/Result';

export default {
    title: 'search/Result',
    component: Result,
};

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

export const Main: Story<ResultProps> = () => <Result items={searchResults} />;

Main.bind({});
