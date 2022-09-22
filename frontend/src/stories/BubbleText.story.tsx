import React from 'react';
import { Story } from '@storybook/react';
import BubbleText, { BubbleTextProps } from '../ui/BubbleText';
import { toBoolean } from './utils/toBoolean';

export default {
    title: 'bubble/BubbleText',
};

export const Main: Story<BubbleTextProps> = ({ ...props }) => {
    return (
        <BubbleText {...props}>
            <span className="text-white">mp4</span>
        </BubbleText>
    );
};

Main.argTypes = {
    filled: toBoolean(),
};

Main.bind({});
