import React from 'react';
import { Story } from '@storybook/react';
import HomeNav from '../ui/navigation/Nav';
import { Provider } from 'react-redux';
import store from '../redux/app/store';

export default {
    title: 'HomeNav',
    comoponent: HomeNav,
    decorators: [
        (Story: Story) => (
            <Provider store={store}>
                <Story />
            </Provider>
        ),
    ],
};

export const Main: Story = () => {
    return <HomeNav />;
};

Main.bind({});
