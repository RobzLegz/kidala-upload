import React from 'react';
import { Story } from '@storybook/react';
import UserDropDown, { UserDropDownProps } from '../ui/UserDropDown';
import { toStr } from './utils/toStr';
import { BASE_URL } from '../requests/routes';
import { ChatIcon } from '@heroicons/react/20/solid';

export default {
    title: 'UserDropDown',
    comoponent: UserDropDown,
};

export const Main: Story<UserDropDownProps> = () => {
    return <UserDropDown />;
};

export const Avatar: Story<UserDropDownProps> = ({ ...props }) => {
    return (
        <UserDropDown
            avatar={
                props.avatar || `${BASE_URL}/178036e0be3943ea94f7ff8e66d08d82`
            }
            {...props}
        />
    );
};

export const Icon: Story<UserDropDownProps> = ({ ...props }) => {
    return (
        <UserDropDown
            icon={<ChatIcon className="text-white h-8" />}
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

Main.bind({});
