import React from 'react';
import { Story } from '@storybook/react';
import FileInfo, { FileInfoProps } from '../ui/FileInfo';
import { Provider } from 'react-redux';
import store from '../redux/app/store';
import { toStr } from './utils/toStr';

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
            {...props}
            source={
                props.source ||
                'https://cdn.kidala.life/cdda47ba0e9a364eccde99c1f00fd54b'
            }
            fileName={props.fileName || 'Bladee.png'}
        />
    );
};

Main.argTypes = {
    source: toStr(),
    fileName: toStr(),
};

Main.bind({});
