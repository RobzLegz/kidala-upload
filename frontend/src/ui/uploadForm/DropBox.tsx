import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearNotification,
    NotificationInfo,
    selectNotification,
} from '../../redux/slices/notificationSlice';

export interface DropBoxProps {
    selectFile?: (files: FileList) => void;
}

export const DropBox: React.FC<DropBoxProps> = ({ selectFile }) => {
    const dispatch = useDispatch();

    const notificationInfo: NotificationInfo = useSelector(selectNotification);

    const [dragActive, setDragActive] = useState(false);

    useEffect(() => {
        if (notificationInfo.type) {
            setTimeout(() => {
                dispatch(clearNotification());
            }, 6000);
        }
    }, [notificationInfo.type]);

    const handleDrag = function (e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = function (e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            selectFile && selectFile(e.dataTransfer.files);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            selectFile && selectFile(e.target.files);
        }
    };

    return (
        <div
            className={`relative flex items-center justify-center w-full h-36 border-4 border-dashed rounded-lg transition-colors duration-300 hover:border-primary-500 overflow-hidden ${
                dragActive ? 'border-transparent' : 'border-primary-600'
            } ${
                notificationInfo.type === 'error'
                    ? 'border-notification hover:border-notification'
                    : ''
            }`}
            onDrag={handleDrag}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <input
                type="file"
                name="drop_box_file"
                id="drop_box_file"
                className="hidden"
                onChange={handleFileSelect}
            />

            <div className={dragActive ? 'dropbox_animation' : ''}></div>

            <div className="absolute w-full h-full flex items-center justify-center bg-transparent p-1">
                <div
                    className={`flex w-full h-full flex-col items-center justify-center bg-primary-900`}
                >
                    <strong className="text-accent">
                        {notificationInfo.type === 'error' &&
                        notificationInfo.message
                            ? notificationInfo.message
                            : 'Drop your files here!'}
                    </strong>

                    <small className="text-primary-200">
                        {notificationInfo.type === 'error' &&
                        notificationInfo.message === 'File size too large'
                            ? 'max file size 1mb'
                            : 'or click to select'}
                    </small>
                </div>
            </div>

            <label
                htmlFor="drop_box_file"
                className="w-full h-full rounded-md cursor-pointer bg-transparent z-10"
            ></label>
        </div>
    );
};
