import { UserIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import React from 'react';

export interface DropDownControllerProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    avatar?: string;
    expanded?: boolean;
    icon?: React.ReactNode;
    handleDropdown: () => void;
}

const DropDownController: React.FC<DropDownControllerProps> = ({
    avatar,
    icon,
    handleDropdown,
    expanded,
    ...props
}) => {
    return (
        <button
            className={`w-8 h-8 flex items-center justify-center relative overflow-hidden ${
                props.className && props.className
            }`}
            {...props}
            onClick={handleDropdown}
        >
            <div className="w-8 h-8 flex items-center justify-center relative bg-primary-700 rounded-md overflow-hidden cursor-pointer z-10">
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
            </div>
        </button>
    );
};

export default DropDownController;
