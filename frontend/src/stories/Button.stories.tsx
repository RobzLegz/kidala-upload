import React from 'react';
import { Story } from '@storybook/react';
import Button, { ButtonProps } from '../ui/Button';
import { toEnum } from './utils/toEnum';
import { toBoolean } from './utils/toBoolean';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

export default {
    title: 'Button',
    argTypes: { onClick: { action: 'clicked' } },
};

export const Main: Story<ButtonProps & { exampleIcon?: boolean }> = ({
    children,
    exampleIcon,
    ...props
}) => {
    return (
        <Button
            {...props}
            icon={
                exampleIcon ? (
                    <MagnifyingGlassIcon className="text-white h-5" />
                ) : undefined
            }
        >
            {children || `Select file`}
        </Button>
    );
};

Main.argTypes = {
    color: toEnum(['primary', 'secondary']),
    size: toEnum(['big', 'small']),
    disabled: toBoolean(),
    loading: toBoolean(),
    exampleIcon: toBoolean(),
};

Main.bind;
