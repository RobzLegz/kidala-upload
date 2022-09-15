import React from 'react';
import { Story } from '@storybook/react';
import FileInfo, { FileInfoProps } from '../ui/FileInfo';
import { Provider } from 'react-redux';
import store from '../redux/app/store';
import { toStr } from './utils/toStr';
import { toBoolean } from './utils/toBoolean';

export default {
    title: 'FileInfo',
    component: FileInfo,
    decorators: [
        (Story: Story) => (
            <Provider store={store}>
                <Story />
            </Provider>
        ),
    ],
};

export const Main: Story<FileInfoProps> = ({ ...props }) => {
    return (
        <FileInfo
            source={
                props.source ||
                'https://cdn.kidala.life/cdda47ba0e9a364eccde99c1f00fd54b'
            }
            fileName={props.fileName || 'Bladee.png'}
            isPrivate={props.isPrivate || true}
            {...props}
        />
    );
};

Main.argTypes = {
    source: toStr(),
    fileName: toStr(),
    isPrivate: toBoolean(),
};

Main.bind({});
