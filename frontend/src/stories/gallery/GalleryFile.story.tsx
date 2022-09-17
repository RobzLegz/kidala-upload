import React from 'react';
import { Story } from '@storybook/react';
import GalleryFile, { GalleryFileProps } from '../../ui/gallery/GalleryFile';
import { FileInterface } from '../../interfaces/file';

export default {
    title: 'Gallery/GalleryFile',
    component: GalleryFile,
};

const testFile = {
    name: 'Insane.mp4',
    hash: 'r21r58152d5891279125d129',
    size: 1229201,
    author: '',
    email: '',
    phoneNumber: '',
    private: false,
    is_ad: false,
    tag: 'crazy',
    description: 'sasgdbasd sauhdusva uogdvas vodsauvd uasd',
} as FileInterface;

const galleryFileProps: GalleryFileProps = {
    info: testFile,
};

export const Main: Story<GalleryFileProps> = () => (
    <GalleryFile info={galleryFileProps.info} />
);

Main.bind({});
