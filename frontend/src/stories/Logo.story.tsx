import React from 'react';
import { Story } from '@storybook/react';
import Logo, { LogoProps } from '../ui/Logo';
import { toNumber } from './utils/toNumber';

export default {
    title: 'Logo',
    comoponent: Logo,
};

export const Main: Story<LogoProps> = ({ ...props }) => {
    return <Logo {...props} />;
};

Main.argTypes = {
    divider: toNumber(),
};

Main.bind({});
