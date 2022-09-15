import React from 'react';
import { Switch } from './Switch';

export interface SwitchWrapperProps {
    checked: boolean;
    setChecked?: React.Dispatch<React.SetStateAction<boolean>>;
    action?: string;
    actionDescription?: string;
    className?: string;
}

export const SwitchWrapper: React.FC<SwitchWrapperProps> = ({
    checked,
    setChecked,
    action,
    actionDescription,
    className,
}) => {
    const handleCheck = () => {
        if (setChecked) {
            setChecked(!checked);
        }
    };

    return (
        <div
            className={`flex items-center justify-between bg-primary-800 py-2 px-4 w-full rounded-lg ${
                className && className
            }`}
            onClick={handleCheck}
        >
            <div className="flex flex-col">
                <strong className="text-primary-100">{action}</strong>

                <small className="text-primary-200">{actionDescription}</small>
            </div>

            <Switch checked={checked} setChecked={setChecked} />
        </div>
    );
};
