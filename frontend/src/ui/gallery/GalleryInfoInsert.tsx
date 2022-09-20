import React from 'react';

export interface GalleryInfoInsertProps
    extends React.ComponentPropsWithRef<'div'> {
    colspan: number;
}

const GalleryInfoInsert: React.FC<GalleryInfoInsertProps> = ({
    colspan,
    ...props
}) => {
    return (
        <div
            className={`${
                colspan === 3 ? 'col-span-3' : 'col-span-4'
            } bg-primary-800 border border-primary-700 h-40 ${
                props.className ? props.className : ''
            }`}
            {...props}
        >
            GalleryInfoInsert
        </div>
    );
};

export default GalleryInfoInsert;
