import React from 'react';
import { Story } from '@storybook/react';
import { DropBox, DropBoxProps } from '../../ui/uploadForm/DropBox';

export default {
    title: 'UploadForm/DropBox',
    comoponent: DropBox,
};

export const Main: Story<DropBoxProps> = () => {
    return <DropBox />;
};

Main.bind({});
