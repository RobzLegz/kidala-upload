import React from 'react';
import { Story } from '@storybook/react';
import { FileInterface } from '../../interfaces/file';
import Result, { ResultProps } from '../../ui/search/Result';

export default {
    title: 'search/components/Result',
    component: Result,
};

const searchResults: FileInterface[] = [
    {
        name: 'Insane.mp4',
        hash: 'r21r58152d5891279125d129',
        size: 1229201,
        author: '',
        email: '',
        phoneNumber: '',
        private: false,
        is_ad: false,
        tag: 'crazy',
        description: 'sasgdbasd sauhdusva uogdvas vodsauvd uasd',
    } as FileInterface,
    {
        name: 'crazy.wav',
        hash: 'asdasdqw1e23e32xe32e32e2d23',
        size: 121212,
        author: '',
        email: '',
        phoneNumber: '',
        private: false,
        is_ad: false,
        tag: '',
        description: 'prost',
    } as FileInterface,
];

export const Main: Story<ResultProps> = () => <Result items={searchResults} />;

Main.bind({});
