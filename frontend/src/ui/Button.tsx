import React, {
    ButtonHTMLAttributes,
    DetailedHTMLProps,
    ReactNode,
} from 'react';
import Spinner from './Spinner';

const sizeClassnames = {
    big: 'py-2 px-6 text-sm rounded-lg',
    small: 'px-2 py-1 text-sm rounded-md',
    tiny: 'px-1 text-sm rounded-5',
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

export type ButtonProps = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> & {
    size?: keyof typeof sizeClassnames;
    color?: keyof typeof colorClassnames;
    loading?: boolean;
    icon?: ReactNode;
    transition?: boolean;
    isLabel?: boolean;
    htmlFor?: string;
};

const Button: React.FC<ButtonProps> = ({
    children,
    size = 'big',
    color = 'primary',
    disabled,
    loading,
    icon,
    className = '',
    transition,
    isLabel,
    htmlFor,
    ...props
}) => {
    if (isLabel && htmlFor) {
        return (
            <label
                className={`flex outline-none cursor-pointer ${
                    sizeClassnames[size]
                } ${transition ? `transition duration-200 ease-in-out` : ``} ${
                    colorClassnames[color]
                } font-bold flex items-center justify-center ${className}`}
                data-testid="button"
                htmlFor={htmlFor}
            >
                <span className={loading ? 'opacity-0' : `flex items-center`}>
                    {icon ? (
                        <span className={`mr-1 items-center`}>{icon}</span>
                    ) : null}
                    {children}
                </span>
            </label>
        );
    }

    return (
        <button
            disabled={disabled || loading}
            className={`flex outline-none ${
                sizeClassnames[size]
            } ${transition ? `transition duration-200 ease-in-out` : ``} ${
                colorClassnames[color]
            } font-bold flex items-center justify-center cursor-pointer ${className}`}
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
                <span className={`absolute`}>
                    <Spinner size="4" />
                </span>
            ) : null}
        </button>
    );
};

export default Button;
