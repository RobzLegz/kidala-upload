import React from 'react';
import { Story } from '@storybook/react';
import { toBoolean } from './utils/toBoolean';
import LanguageSelector, {
    LanguageSelectorProps,
} from '../ui/LanguageSelector';

export default {
    title: 'LanguageSelector',
};

export const Main: Story<LanguageSelectorProps> = ({ ...props }) => {
    return <LanguageSelector {...props} />;
};

Main.argTypes = {
    testOpen: toBoolean(),
};

Main.bind({});
