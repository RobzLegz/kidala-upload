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
import { useKeyPress } from '../../hooks/useKeyPress';
import { formatTag } from '../../utils/formatTag';

const UploadForm: React.FC = () => {
    const dispatch = useDispatch();
    const escPressed = useKeyPress('Escape');

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
    const [imageDimensions, setImageDimensions] = useState({
        width: 0,
        height: 0,
    });

    const resetState = () => {
        setImageDimensions({
            width: 0,
            height: 0,
        });
        setDescription('');
        setIsPrivate(false);
        setLoading(false);
        setSavedToClipboard(false);
        setAddingTag(false);
        setTags([]);
        setTag('');
        setHash('');
        setFilePreview('');
        setFile(null);
    };

    useEffect(() => {
        if (escPressed) {
            resetState();
        }
    }, [escPressed]);

    useEffect(() => {
        if (filePreview) {
            const img = new Image();
            img.src = filePreview;
            img.onload = () => {
                const { width, height } = img;

                let nH = 0;

                const nW = 128;
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
    }, [filePreview]);

    useEffect(() => {
        const handlePasteAnywhere = (event: any) => {
            const cb_file: File = event.clipboardData.files[0];

            if (cb_file) {
                if (cb_file.size > 1024 * 1024) {
                    return dispatch(
                        setNotification({
                            type: 'error',
                            message: 'File size too large',
                        })
                    );
                }

                resetState();

                if (detectFileType(cb_file.name) === 'image') {
                    const preview = URL.createObjectURL(cb_file);

                    setFilePreview(preview);
                } else {
                    setFilePreview('');
                }

                dispatch(clearNotification());
                setFile(cb_file);
            }

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
                        type: 'tag_err',
                        message: "Tags can't be that long",
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
            file,
            tags,
            description,
            isPrivate
        );

        setFile(null);
        setLoading(false);
        setTag('');
        setAddingTag(false);
        setImageDimensions({ width: 0, height: 0 });
        setDescription('');
        setTags([]);
    };

    const selectFile = (files: FileList) => {
        if (!files || files.length === 0) {
            return;
        }

        const selectedFile = files[0];

        if (selectedFile.size > 1024 * 1024 * 10) {
            dispatch(
                setNotification({
                    type: 'error',
                    message: 'File size too large',
                })
            );
            return;
        }

        resetState();

        if (detectFileType(selectedFile.name) === 'image') {
            const preview = URL.createObjectURL(selectedFile);

            setFilePreview(preview);
        } else {
            setFilePreview('');
            setImageDimensions({ width: 0, height: 0 });
        }

        dispatch(clearNotification());
        setFile(selectedFile);
    };

    const addTag = (e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
        }

        if (tags.some((t) => t === tag)) {
            dispatch(
                setNotification({
                    type: 'tag_err',
                    message: 'This tag has been selected',
                })
            );

            return;
        }

        if (tags.length >= 3) {
            dispatch(
                setNotification({
                    type: 'tag_err',
                    message: 'You can only add 3 tags',
                })
            );

            return;
        }

        if (tag.length > 25) {
            dispatch(
                setNotification({
                    type: 'tag_err',
                    message: "Tags can't be that long",
                })
            );

            return;
        }

        const formattedTag = formatTag(tag);

        setTags([...tags, formattedTag]);
        setTag('');
    };

    return (
        <div
            className={`w-11/12 max-w-[600px] rounded-lg flex flex-col items-center justify-center`}
            ref={formRef}
        >
            {file ? (
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
                    imageDimensions={imageDimensions}
                    description={description}
                    setDescription={setDescription}
                />
            ) : hash ? (
                <UploadResponse
                    hash={hash}
                    setHash={setHash}
                    savedToClipboard={savedToClipboard}
                    setSavedToClipboard={setSavedToClipboard}
                />
            ) : (
                <DropBox selectFile={selectFile} />
            )}
        </div>
    );
};

export default UploadForm;
