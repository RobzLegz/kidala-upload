import React, { forwardRef } from 'react';
import { FileInterface } from '../../interfaces/file';

export interface GalleryInfoInsertProps
    extends React.ComponentPropsWithRef<'div'> {
    colspan: number;
    fileInfo?: FileInterface;
}
const GalleryInfoInsert = forwardRef<any, GalleryInfoInsertProps>(
    (props, ref) => {
        return (
            <div
                className={`${
                    props.colspan === 3 ? 'col-span-3' : 'col-span-4'
                } bg-primary-800 border border-primary-700 h-40 ${
                    props.className ? props.className : ''
                }`}
                ref={ref}
                {...props}
            >
                {props.fileInfo?.name}
            </div>
        );
    }
);

export default GalleryInfoInsert;
