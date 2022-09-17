import React from 'react';
import { Story } from '@storybook/react';
import { ButtonProps } from '../ui/Button';
import { toEnum } from './utils/toEnum';
import { toBoolean } from './utils/toBoolean';
import { SearchIcon } from '@heroicons/react/20/solid';
import SquareButton from '../ui/SquareButton';

export default {
    title: 'Button/SquareButton',
    argTypes: { onClick: { action: 'clicked' } },
    component: SquareButton,
};

export const Main: Story<ButtonProps & { exampleIcon?: boolean }> = ({
    children,
    exampleIcon,
    ...props
}) => {
    return (
        <SquareButton
            {...props}
            icon={
                exampleIcon ? (
                    <SearchIcon className="text-white h-5" />
                ) : undefined
            }
        >
            {children || `Select file`}
        </SquareButton>
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
