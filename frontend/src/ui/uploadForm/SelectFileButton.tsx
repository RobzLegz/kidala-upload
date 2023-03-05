import React, {
    DetailedHTMLProps,
    LabelHTMLAttributes,
    ReactNode,
} from 'react';
import Spinner from '../Spinner';

const sizeClassnames = {
    big: 'text-sm',
    small: 'text-sm',
    tiny: 'text-sm',
};

const colorClassnames = {
    primary:
        'text-button bg-accent transition duration-200 ease-in-out hover:bg-accent-hover disabled:text-accent-disabled disabled:bg-accent-hover',
    secondary:
        'text-button bg-primary-700 hover:bg-primary-600 disabled:text-primary-300',
    'secondary-800':
        'text-button bg-primary-800 hover:bg-primary-600 disabled:text-primary-300',
    'primary-300':
        'text-button bg-primary-700 hover:bg-primary-600 disabled:text-primary-300',
    transparent: 'text-button bg-transparent',
    'accent-secondary':
        'text-button bg-secondary hover:bg-secondary-washed-out disabled:text-secondary-washed-out',
};

export type SelectFileButtonProps = DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
> & {
    size?: keyof typeof sizeClassnames;
    color?: keyof typeof colorClassnames;
    loading?: boolean;
    icon?: ReactNode;
    transition?: boolean;
    disabled?: boolean;
};

const SelectFileButton: React.FC<SelectFileButtonProps> = ({
    children,
    size = 'big',
    color = 'primary',
    disabled = false,
    loading,
    icon,
    className = '',
    transition,
    ...props
}) => {
    return (
        <label
            className={`flex outline-none cursor-pointer focus:ring-4 focus:ring-${color} ${
                sizeClassnames[size]
            } ${transition ? `transition duration-200 ease-in-out` : ``} ${
                colorClassnames[color]
            } font-bold flex items-center justify-center ${className}`}
            data-testid="button"
            {...props}
        >
            <span className={loading ? 'opacity-0' : `flex items-center`}>
                {icon ? (
                    <span className={`mr-1 items-center`}>{icon}</span>
                ) : null}
                {children}
            </span>

            {loading ? (
                <span className="absolute">
                    <Spinner size="4" />
                </span>
            ) : null}
        </label>
    );
};

export default SelectFileButton;
