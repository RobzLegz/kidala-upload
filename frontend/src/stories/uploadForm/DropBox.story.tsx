import React from 'react';
import { Story } from '@storybook/react';
import { DropBox, DropBoxProps } from '../../ui/uploadForm/DropBox';
import { Provider } from 'react-redux';
import store from '../../redux/app/store';

export default {
    title: 'UploadForm/DropBox',
    comoponent: DropBox,
    decorators: [
        (Story: Story) => (
            <Provider store={store}>
                <Story />
            </Provider>
        ),
    ],
};

export const Main: Story<DropBoxProps> = () => {
    return <DropBox />;
};

Main.bind({});
