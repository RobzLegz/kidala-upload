import React from 'react';
import { Story } from '@storybook/react';
import { Tag, TagProps } from '../ui/Tag';
import { toStr } from './utils/toStr';
import { toBoolean } from './utils/toBoolean';
import { toEnum } from './utils/toEnum';

export default {
    title: 'Tag',
    comoponent: Tag,
};

const tagProps: TagProps = {
    tags: ['sus', 'amongus', 'imposter'],
    tag: 'sus',
};

export const Main: Story<TagProps> = ({ ...props }) => {
    return <Tag tags={tagProps.tags} tag={props.tag || tagProps.tag} />;
};

Main.argTypes = {
    tag: toStr(),
};

Main.bind({});
