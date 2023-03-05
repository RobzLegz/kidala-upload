import React from 'react';
import { Story } from '@storybook/react';
import { toStr } from './utils/toStr';
import { toBoolean } from './utils/toBoolean';
import CheckBox, { CheckBoxProps } from '../ui/Checkbox';

export default {
    title: 'CheckBox',
    argTypes: {
        onClick: { action: 'clicked' },
    },
};

export const Main: Story<CheckBoxProps> = ({ ...props }) => {
    return <CheckBox text={props.text || ''} {...props} />;
};

Main.argTypes = {
    text: toStr(),
    checked: toBoolean(),
};

Main.bind({});
