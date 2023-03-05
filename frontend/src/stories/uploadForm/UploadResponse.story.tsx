import React from 'react';
import { Story } from '@storybook/react';
import { toStr } from '../utils/toStr';
import {
    UploadResponse,
    UploadResponseProps,
} from '../../ui/uploadForm/UploadResponse';
import { Provider } from 'react-redux';
import store from '../../redux/app/store';
import { toBoolean } from '../utils/toBoolean';

export default {
    title: 'UploadForm/Response',
    comoponent: UploadResponse,
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
    return <UploadResponse hash={props.hash || tagProps.hash} />;
};

Main.argTypes = {
    hash: toStr(),
    savedToClipboard: toBoolean(),
};

Main.bind({});
