import React from 'react';
import CheckAuth from '../hooks/CheckAuth';
import HeadParser, { HeadParserProps } from './HeadParser';

interface PageModuleProps extends HeadParserProps {
    className?: string;
    children?: React.ReactNode;
}

const PageModule: React.FC<PageModuleProps> = ({
    file,
    description,
    title,
    className,
    children,
}) => {
    return (
        <main className={`page ${className}`}>
            <HeadParser title={title} description={description} file={file} />

            {children}

            <CheckAuth />
        </main>
    );
};

export default PageModule;
