import React, { ReactNode } from 'react';

export interface SwitchProps {
    checked: boolean;
    icon?: ReactNode;
    setChecked?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Switch: React.FC<SwitchProps> = ({
    checked,
    setChecked,
    icon,
}) => {
    const handleCheck = () => {
        if (setChecked) {
            setChecked(!checked);
        }
    };

    return (
        <div
            className={`w-10 h-5 relative rounded-full border px-1 transition duration-500 ease-in-out-hard ${
                checked
                    ? 'border-primary-100 bg-accent'
                    : 'border-primary-300 bg-primary-700'
            }`}
            onClick={handleCheck}
        >
            <div
                className={`flex items-center justify-center w-5 h-5 rounded-full transition duration-500 ease-in-out-hard absolute top-2/4 left-0 transform -translate-y-1/2 ${
                    checked
                        ? 'translate-x-5 bg-white'
                        : 'translate-x-0 bg-primary-300'
                }`}
            >
                {icon && icon}
            </div>
        </div>
    );
};
