import React from 'react';
import { Story } from '@storybook/react';
import Gallery from '../../ui/gallery/Gallery';
import { Provider } from 'react-redux';
import store from '../../redux/app/store';

export default {
    title: 'Gallery/Gallery',
    component: Gallery,
    decorators: [
        (Story: Story) => (
            <Provider store={store}>
                <Story />
            </Provider>
        ),
    ],
};

export const Main: Story = ({ ...props }) => <Gallery />;

Main.argTypes = {};

Main.bind({});
