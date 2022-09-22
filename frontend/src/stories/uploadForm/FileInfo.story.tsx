import React from 'react';
import { Story } from '@storybook/react';
import FileInfo, { FileInfoProps } from '../../ui/uploadForm/FileInfo';
import { Provider } from 'react-redux';
import store from '../../redux/app/store';
import { toStr } from '../utils/toStr';
import { toBoolean } from '../utils/toBoolean';
import { BASE_URL } from '../../requests/routes';

export default {
    title: 'UploadForm/FileInfo',
    component: FileInfo,
    decorators: [
        (Story: Story) => (
            <Provider store={store}>
                <Story />
            </Provider>
        ),
    ],
    argTypes: { onClick: { action: 'clicked' } },
};

export const Main: Story<FileInfoProps> = ({ ...props }) => {
    return (
        <FileInfo
            source={
                props.source || `${BASE_URL}/cdda47ba0e9a364eccde99c1f00fd54b`
            }
            fileName={props.fileName || 'Bladee.png'}
            isPrivate={props.isPrivate || true}
            imageDimensions={{ width: 128, height: 144 }}
            {...props}
        />
    );
};

export const Mp4: Story<FileInfoProps> = ({ ...props }) => {
    return (
        <FileInfo
            source={
                props.source || `${BASE_URL}/09713e1e139f390f13cc29b056cfd05f`
            }
            fileName={props.fileName || 'Sussy-vid.mp4'}
            isPrivate={props.isPrivate || true}
            {...props}
        />
    );
};

export const Mp3: Story<FileInfoProps> = ({ ...props }) => {
    return (
        <FileInfo
            fileName={props.fileName || 'Amongus-theme-song.mp3'}
            isPrivate={props.isPrivate || true}
            {...props}
        />
    );
};

export const Css: Story<FileInfoProps> = ({ ...props }) => {
    return (
        <FileInfo
            fileName={props.fileName || 'styles.css'}
            isPrivate={props.isPrivate || true}
            {...props}
        />
    );
};

export const Scss: Story<FileInfoProps> = ({ ...props }) => {
    return (
        <FileInfo
            fileName={props.fileName || 'styles.scss'}
            isPrivate={props.isPrivate || true}
            {...props}
        />
    );
};

export const Html: Story<FileInfoProps> = ({ ...props }) => {
    return (
        <FileInfo
            fileName={props.fileName || 'index.html'}
            isPrivate={props.isPrivate || true}
            {...props}
        />
    );
};

export const Js: Story<FileInfoProps> = ({ ...props }) => {
    return (
        <FileInfo
            fileName={props.fileName || 'index.js'}
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
