import { UserIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import React from 'react';

export interface DropDownControllerProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    avatar?: string;
    icon?: React.ReactNode;
}

const DropDownController: React.FC<DropDownControllerProps> = ({
    avatar,
    icon,
    ...props
}) => {
    return (
        <button
            className={`w-10 h-10 flex items-center justify-center relative bg-primary-700 rounded-full overflow-hidden ${props.className}`}
            {...props}
        >
            {avatar ? (
                <Image
                    src={avatar}
                    objectFit="cover"
                    layout="fill"
                    className="rounded-full"
                    quality={80}
                />
            ) : icon ? (
                icon
            ) : (
                <UserIcon className="text-white h-full mt-2" />
            )}
        </button>
    );
};

export default DropDownController;
