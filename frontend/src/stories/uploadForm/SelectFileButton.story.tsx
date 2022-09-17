import React from 'react';
import { Story } from '@storybook/react';
import { toEnum } from '../utils/toEnum';
import { toBoolean } from '../utils/toBoolean';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import SelectFileButton, {
    SelectFileButtonProps,
} from '../../ui/uploadForm/SelectFileButton';

export default {
    title: 'UploadForm/SelectFileButton',
    argTypes: { onClick: { action: 'clicked' } },
    component: SelectFileButton,
};

export const Main: Story<SelectFileButtonProps & { exampleIcon?: boolean }> = ({
    children,
    exampleIcon,
    disabled,
    ...props
}) => {
    return (
        <SelectFileButton
            {...props}
            icon={
                exampleIcon ? (
                    <MagnifyingGlassIcon className="text-white h-5" />
                ) : undefined
            }
        >
            {children || `Select file`}
        </SelectFileButton>
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
