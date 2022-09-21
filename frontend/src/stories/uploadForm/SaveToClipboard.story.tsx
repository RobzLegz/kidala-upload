import React from 'react';
import { Story } from '@storybook/react';
import { toStr } from '../utils/toStr';
import SaveToClipboard from '../../ui/uploadForm/SaveToClipboard';
import { Provider } from 'react-redux';
import store from '../../redux/app/store';
import { toBoolean } from '../utils/toBoolean';
import { UploadResponseProps } from '../../ui/uploadForm/UploadResponse';

export default {
    title: 'UploadForm/SavedToClipboard',
    comoponent: SaveToClipboard,
    decorators: [
        (Story: Story) => (
            <Provider store={store}>
                <Story />
            </Provider>
        ),
    ],
};

const tagProps: UploadResponseProps = {
    hash: 'asdasdasas12e1dd1d',
};

export const Main: Story<UploadResponseProps> = ({ ...props }) => {
    return <SaveToClipboard {...props} />;
};

Main.argTypes = {
    hash: toStr(),
    savedToClipboard: toBoolean(),
};

Main.bind({});
