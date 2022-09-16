import React from 'react';
import HeadParser, { HeadParserProps } from './HeadParser';

interface PageModuleProps extends HeadParserProps {
    className?: string;
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
        </main>
    );
};

export default PageModule;
