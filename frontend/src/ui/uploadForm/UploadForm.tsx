import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LanguageInfo, selectLanguage } from '../../redux/slices/languageSlice';
import {
    clearNotification,
    NotificationInfo,
    selectNotification,
    setNotification,
} from '../../redux/slices/notificationSlice';
import { uploadFile } from '../../requests/uploadRequests';
import { detectFileType } from '../../utils/detectFileType';
import FileInfo from './FileInfo';
import { DropBox } from './DropBox';
import { UploadResponse } from './UploadResponse';

const UploadForm: React.FC = () => {
    const dispatch = useDispatch();

    const notificationInfo: NotificationInfo = useSelector(selectNotification);
    const languageInfo: LanguageInfo = useSelector(selectLanguage);

    const formRef = useRef<any>(null);

    const [file, setFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState('');
    const [hash, setHash] = useState('');
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [addingTag, setAddingTag] = useState(false);
    const [savedToClipboard, setSavedToClipboard] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isPrivate, setIsPrivate] = useState(false);
    const [description, setDescription] = useState('');

    useEffect(() => {
        const handlePasteAnywhere = (event: any) => {
            const cb_file: File = event.clipboardData.files[0];

            if (cb_file.size > 1024 * 1024) {
                return dispatch(
                    setNotification({
                        type: 'error',
                        message: 'File size too large',
                    })
                );
            }

            if (detectFileType(cb_file.name) === 'image') {
                const preview = URL.createObjectURL(cb_file);

                setFilePreview(preview);
            } else {
                setFilePreview('');
            }

            dispatch(clearNotification());
            setFile(cb_file);
            setSavedToClipboard(false);
            setHash('');
            setTag('');
            setAddingTag(false);

            event.preventDefault();
        };

        window.addEventListener('paste', handlePasteAnywhere);

        return () => {
            window.removeEventListener('paste', handlePasteAnywhere);
        };
    }, []);

    const handleUpload = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();

        if (addingTag) {
            addTag();

            setAddingTag(false);
            setTag('');

            return;
        }

        if (loading) {
            return;
        }

        if (addingTag) {
            if (tag.length > 25) {
                dispatch(
                    setNotification({
                        type: 'error',
                        message: "Tags can't be that long!",
                    })
                );

                return;
            }

            setAddingTag(false);
        }

        setLoading(true);

        await uploadFile(
            setHash,
            dispatch,
            setFile,
            file,
            tag.toLowerCase(),
            description,
            isPrivate
        );

        setLoading(false);
        setTag('');
        setAddingTag(false);
    };

    const selectFile = (files: FileList) => {
        if (!files || files.length === 0) {
            return;
        }

        const selectedFile = files[0];

        if (selectedFile.size > 1024 * 1024) {
            dispatch(
                setNotification({
                    type: 'error',
                    message: 'File size too large',
                })
            );
            return;
        }

        if (detectFileType(selectedFile.name) === 'image') {
            const preview = URL.createObjectURL(selectedFile);

            setFilePreview(preview);
        } else {
            setFilePreview('');
        }

        dispatch(clearNotification());
        setFile(selectedFile);
        setSavedToClipboard(false);
        setHash('');
        setTag('');
        setAddingTag(false);
    };

    const addTag = (e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
        }

        setTags([...tags, tag.toLowerCase()]);
        setTag('');
    };

    return (
        <form
            className="w-11/12 max-w-[600px] rounded-lg flex flex-col items-center justify-center"
            ref={formRef}
        >
            {hash ? (
                <UploadResponse
                    hash={hash}
                    savedToClipboard={savedToClipboard}
                    setSavedToClipboard={setSavedToClipboard}
                />
            ) : file ? (
                <FileInfo
                    source={filePreview}
                    fileName={file.name}
                    tag={tag}
                    setTag={setTag}
                    isPrivate={isPrivate}
                    setIsPrivate={setIsPrivate}
                    tags={tags}
                    setTags={setTags}
                    addTag={addTag}
                    selectFile={selectFile}
                    formWidth={
                        formRef.current
                            ? formRef.current.offsetWidth
                            : undefined
                    }
                    handleUpload={handleUpload}
                />
            ) : (
                <DropBox selectFile={selectFile} />
            )}
        </form>
    );
};

export default UploadForm;
