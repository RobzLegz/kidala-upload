import React from 'react';
import { Story } from '@storybook/react';
import Home from '../../modules/pages/Home';
import { Provider } from 'react-redux';
import store from '../../redux/app/store';

export default {
    title: 'Pages/Home',
    decorators: [
        (Story: Story) => (
            <Provider store={store}>
                <Story />
            </Provider>
        ),
    ],
};

export const Main: Story = () => {
    return <Home />;
};

Main.bind({});
