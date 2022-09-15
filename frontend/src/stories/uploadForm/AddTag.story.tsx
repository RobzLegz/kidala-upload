import React from 'react';
import { Story } from '@storybook/react';
import { AddTag, AddTagProps } from '../../ui/AddTag';
import { toStr } from '../utils/toStr';
import { toBoolean } from '../utils/toBoolean';

export default {
    title: 'UploadForm/AddTag',
    comoponent: AddTag,
};

export const Main: Story<AddTagProps> = ({ ...props }) => {
    return <AddTag {...props} />;
};

Main.argTypes = {
    tag: toStr(),
    opened: toBoolean(),
};

Main.bind({});
