import React from 'react';
import { Story } from '@storybook/react';
import { toStr } from './utils/toStr';
import { toBoolean } from './utils/toBoolean';
import { Input, InputProps } from '../ui/Input';
import { toNumber } from './utils/toNumber';

export default {
    title: 'input/Input',
    argTypes: {
        onChange: { action: 'changed' },
    },
};

export const Main: Story<InputProps> = ({ placeholder, ...props }) => {
    return <Input placeholder={placeholder || 'Search for files'} {...props} />;
};

Main.argTypes = {
    value: toStr(),
    textarea: toBoolean(),
    rows: toNumber(),
    error: toStr(),
    transparent: toBoolean(),
};

Main.bind({});
