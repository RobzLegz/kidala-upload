import React from 'react';
import { Story } from '@storybook/react';
import { TagWrapper, TagWrapperProps } from '../../ui/uploadForm/TagWrapper';
import { toStr } from '../utils/toStr';
import { toBoolean } from '../utils/toBoolean';
import { toEnum } from '../utils/toEnum';

export default {
    title: 'UploadForm/TagWrapper',
    comoponent: TagWrapper,
};

const tagWrapperProps: TagWrapperProps = {
    tags: ['sus', 'amongus', 'imposter'],
};

export const Main: Story<TagWrapperProps> = () => {
    return <TagWrapper tags={tagWrapperProps.tags} />;
};

Main.bind({});
