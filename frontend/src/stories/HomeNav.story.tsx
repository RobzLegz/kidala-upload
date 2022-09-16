import React from 'react';
import { Story } from '@storybook/react';
import HomeNav from '../ui/navigation/HomeNav';

export default {
    title: 'HomeNav',
    comoponent: HomeNav,
};

export const Main: Story = () => {
    return <HomeNav />;
};

Main.bind({});
