import React from 'react';
import { Story } from '@storybook/react';
import GalleryPage from '../../modules/pages/GalleryPage';
import { Provider } from 'react-redux';
import store from '../../redux/app/store';

export default {
    title: 'Pages/GalleryPage',
    decorators: [
        (Story: Story) => (
            <Provider store={store}>
                <Story />
            </Provider>
        ),
    ],
};

export const Main: Story = () => {
    return <GalleryPage />;
};

Main.bind({});
