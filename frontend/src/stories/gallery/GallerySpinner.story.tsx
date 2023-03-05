import React from 'react';
import { Story } from '@storybook/react';
import GallerySpinner from '../../ui/gallery/GallerySpinner';

export default {
    title: 'GallerySpinner/GallerySpinner',
    component: GallerySpinner,
};

export const Main: Story = () => <GallerySpinner />;

Main.argTypes = {};

Main.bind({});
