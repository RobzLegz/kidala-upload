import React from 'react';
import { Story } from '@storybook/react';
import { toBoolean } from './utils/toBoolean';
import { Switch, SwitchProps } from '../ui/Switch';

export default {
    title: 'Switch',
    comoponent: Switch,
};

export const Main: Story<SwitchProps> = ({ checked, ...props }) => {
    return <Switch checked={checked} {...props} />;
};

Main.argTypes = {
    checked: toBoolean(),
};

Main.bind({});
