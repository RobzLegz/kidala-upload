import React from 'react';
import { FileInterface } from '../../interfaces/file';

export interface GalleryFileProps {
    info: FileInterface;
}

const GalleryFile: React.FC<GalleryFileProps> = ({ info }) => {
    return <div>GalleryFile</div>;
};

export default GalleryFile;
