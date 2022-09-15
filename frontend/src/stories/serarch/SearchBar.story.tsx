import React from 'react';
import { Story } from '@storybook/react';
import SearchBar, { SearchBarProps } from '../../ui/search/SearchBar';
import { toStr } from '../utils/toStr';
import { toBoolean } from '../utils/toBoolean';

export default {
    title: 'search/components/SearchBar',
    argTypes: {
        onChange: { action: 'changed' },
    },
};

const TheSearchBar: Story<SearchBarProps> = ({ placeholder, ...props }) => {
    return (
        <SearchBar placeholder={placeholder || 'Search for files'} {...props} />
    );
};

export const Main = TheSearchBar.bind({});

Main.argTypes = {
    value: toStr(),
    placeholder: toStr(),
    isLoading: toBoolean(),
};

Main.bind({})
