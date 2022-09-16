import React from 'react';
import { Story } from '@storybook/react';
import { toStr } from './utils/toStr';
import DropDownController, {
    DropDownControllerProps,
} from '../ui/DropDownController';
import { ChatIcon } from '@heroicons/react/solid';
import { BASE_URL } from '../requests/routes';

export default {
    title: 'DropDownController',
    argTypes: {
        onClick: { action: 'clicked' },
    },
};

export const Main: Story<DropDownControllerProps> = ({ ...props }) => {
    return <DropDownController {...props} />;
};

export const Icon: Story<DropDownControllerProps> = ({ ...props }) => {
    return (
        <DropDownController
            icon={<ChatIcon className="text-white h-8" />}
            {...props}
        />
    );
};

export const Avatar: Story<DropDownControllerProps> = ({ ...props }) => {
    return (
        <DropDownController
            avatar={
                props.avatar || `${BASE_URL}/178036e0be3943ea94f7ff8e66d08d82`
            }
            {...props}
        />
    );
};

Avatar.argTypes = {
    avatar: toStr(),
};

Icon.argTypes = {
    avatar: toStr(),
};

Main.argTypes = {
    avatar: toStr(),
};

Main.bind({});
