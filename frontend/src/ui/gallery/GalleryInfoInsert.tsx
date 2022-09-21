import { default as OptImage } from 'next/image';
import React, { forwardRef, useEffect, useState } from 'react';
import { FileInterface } from '../../interfaces/file';
import { detectFileType } from '../../utils/detectFileType';
import { BASE_URL } from './../../requests/routes';

export interface GalleryInfoInsertProps
    extends React.ComponentPropsWithRef<'div'> {
    colspan: number;
    fileInfo: FileInterface;
}
const GalleryInfoInsert = forwardRef<any, GalleryInfoInsertProps>(
    (props, ref) => {
        const { fileInfo } = props;

        const [imageDimensions, setImageDimensions] = useState({
            width: 0,
            height: 0,
        });

        const fileSource = `${BASE_URL}/files/${fileInfo.hash}/${fileInfo.name}`;

        useEffect(() => {
            if (fileInfo && detectFileType(fileInfo.name) === 'image') {
                const img = new Image();
                img.src = fileSource;
                img.onload = () => {
                    const { width, height } = img;

                    let nH = 0;

                    const nW = 600;
                    const w_c_p = ((nW - width) / width) * 100;
                    const f_w_c_p = Math.floor(w_c_p) / 100;
                    const hDiff = height * f_w_c_p;

                    nH = height + hDiff;

                    setImageDimensions({
                        width: nW,
                        height: nH,
                    });
                };
            }
        }, [fileInfo]);

        return (
            <div
                className={`${
                    props.colspan === 3 ? 'col-span-3' : 'col-span-4'
                } bg-primary-800 border border-primary-700 rounded-lg flex flex-col items-center justify-center p-2 ${
                    props.className ? props.className : ''
                }`}
                ref={ref}
                {...props}
            >
                <div className="flex flex-col rounded-lg items-center justify-start">
                    {detectFileType(fileInfo.name) === 'image' ? (
                        <OptImage
                            src={fileSource}
                            width={imageDimensions.width}
                            height={imageDimensions.height}
                            draggable={false}
                            blurDataURL={fileSource}
                            placeholder="blur"
                            className='rounded-lg'
                        />
                    ) : null}

                    <p className="text-white mt-2">{fileInfo.name}</p>
                </div>
            </div>
        );
    }
);

export default GalleryInfoInsert;
