import React from 'react';
import { Story } from '@storybook/react';
import { toBoolean } from './utils/toBoolean';
import { SwitchWrapper, SwitchWrapperProps } from '../ui/SwitchWrapper';
import { toStr } from './utils/toStr';

export default {
    title: 'SwitchWrapper',
    comoponent: SwitchWrapper,
};

export const Main: Story<SwitchWrapperProps> = ({ checked, ...props }) => {
    return (
        <SwitchWrapper
            checked={checked}
            action={props.action || 'Make private'}
            actionDescription={
                props.actionDescription ||
                'Other users wont be able to see your uploadeed file'
            }
            {...props}
        />
    );
};

Main.argTypes = {
    checked: toBoolean(),
    action: toStr(),
    actionDescription: toStr(),
};

Main.bind({});
