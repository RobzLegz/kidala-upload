import React, { useEffect, useState } from 'react';
import { ClipboardCopyIcon, DocumentIcon } from '@heroicons/react/solid';
import { uploadFile } from '../../requests/uploadRequests';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearNotification,
    NotificationInfo,
    selectNotification,
    setNotification,
} from '../../redux/slices/notificationSlice';
import Spinner from '../notifications/Loading';
import { LanguageInfo, selectLanguage } from '../../redux/slices/languageSlice';

function isFileImage(file: File) {
    return file && file['type'].split('/')[0] === 'image';
}

function UploadForm() {
    const dispatch = useDispatch();

    const notificationInfo: NotificationInfo = useSelector(selectNotification);
    const languageInfo: LanguageInfo = useSelector(selectLanguage);

    const [file, setFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState('');
    const [hash, setHash] = useState('');
    const [tag, setTag] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [addingTag, setAddingTag] = useState(false);
    const [savedToClipboard, setSavedToClipboard] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handlePasteAnywhere = (event: any) => {
            const cb_file = event.clipboardData.files[0];

            if (cb_file.size > 1024 * 1024) {
                return dispatch(
                    setNotification({
                        type: 'error',
                        message: 'File size too large',
                    })
                );
            }

            if (isFileImage(cb_file)) {
                const preview = URL.createObjectURL(cb_file);

                setFilePreview(preview);
            } else {
                setFilePreview('');
            }

            dispatch(clearNotification());
            setFile(cb_file);
            setSavedToClipboard(false);
            setHash('');

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

        if (loading) {
            return;
        }

        if (addingTag) {
            setSelectedTag(tag);
            setAddingTag(false);
            return;
        }

        setLoading(true);

        await uploadFile(setHash, dispatch, setFile, file);

        setLoading(false);
    };

    const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) {
            return;
        }

        const selectedFile = e.target.files[0];

        if (selectedFile.size > 1024 * 1024) {
            return dispatch(
                setNotification({
                    type: 'error',
                    message: 'File size too large',
                })
            );
        }

        if (isFileImage(selectedFile)) {
            const preview = URL.createObjectURL(selectedFile);

            setFilePreview(preview);
        } else {
            setFilePreview('');
        }

        dispatch(clearNotification());
        setFile(selectedFile);
        setSavedToClipboard(false);
        setHash('');
    };

    const saveToClipboard = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();

        navigator.clipboard.writeText(`https://kidala.life/gallery/${hash}`);

        setSavedToClipboard(true);
    };

    const openUrl = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        setSavedToClipboard(false);

        window.open(`/gallery/${hash}`);
        dispatch(clearNotification());
    };

    return (
        <form className="w-full max-w-[400px] flex flex-col items-center justify-center px-2 sm:px-0">
            {notificationInfo.message ? (
                <p className="bg-red-600 py-1 px-4 text-white font-mono mb-4">
                    {notificationInfo.message}
                </p>
            ) : null}

            <div className="flex w-full items-center justify-center">
                <input
                    type="file"
                    onChange={(e) => selectFile(e)}
                    className="hidden"
                    name="selectFile"
                    id="selectFile"
                />

                <label
                    htmlFor="selectFile"
                    className="cursor-pointer w-40 h-10 flex items-center justify-center text-center bg-white text-black font-mono"
                >
                    {file && !hash
                        ? languageInfo.text.home.changeFile
                        : languageInfo.text.home.selectFile}
                </label>

                <button
                    type="submit"
                    onClick={handleUpload}
                    className={`bg-gray-900 text-white w-40 h-10 ml-2 flex-1 font-mono flex items-center justify-center ${
                        !file ? 'opacity-75' : ''
                    }`}
                    disabled={!file}
                >
                    {!loading ? (
                        <p className="text-white">
                            {languageInfo.text.home.upload}
                        </p>
                    ) : (
                        <div className="w-8 h-8 flex items-center justify-center">
                            <Spinner />
                        </div>
                    )}
                </button>
            </div>

            {!hash && filePreview && file ? (
                <img
                    src={filePreview}
                    alt="file preview"
                    className="w-full mt-12"
                />
            ) : !hash && file ? (
                <div className="flex mt-5 bg-green-700 p-2">
                    <DocumentIcon className="text-white mr-1 h-6" />

                    <div className="flex items-center justify-center">
                        <p className="text-white mr-1">{file.name}</p>

                        <p className="text-white">
                            {languageInfo.text.home.ready}
                        </p>
                    </div>
                </div>
            ) : hash ? (
                <>
                    <button
                        className="w-[250px] h-12 mt-12 text-xl bg-white font-mono "
                        onClick={openUrl}
                    >
                        {languageInfo.text.global.open}
                    </button>

                    <button
                        className="flex w-full pl-4 bg-emerald-600 items-center justify-center mt-4"
                        onClick={saveToClipboard}
                    >
                        <p className="text-white text-center truncate flex-1 font-mono">
                            {`https://kidala.life/gallery/${hash}`}
                        </p>

                        <div className="h-10 flex items-center justify-center w-11 border-blue-300 bg-black">
                            <ClipboardCopyIcon className="text-white h-6" />
                        </div>
                    </button>

                    {savedToClipboard ? (
                        <small className="text-emerald-500 text-center mt-2 font-mono">
                            {languageInfo.text.home.copied}
                        </small>
                    ) : null}
                </>
            ) : (
                <small className="text-gray-100 mt-2">
                    {languageInfo.text.home.maxSize}
                </small>
            )}

            {!hash && file && !selectedTag ? (
                <div
                    className={`max-w-[280px] bg-black h-8 mt-4 rounded-full transition-all duration-500 relative flex items-center justify-center ${
                        addingTag ? 'w-[95%]' : 'w-24'
                    }`}
                >
                    <button
                        className={`text-white transition-all duration-300 h-full ${
                            addingTag ? 'hidden' : 'w-full'
                        }`}
                        disabled={addingTag}
                        onClick={(e) => {
                            e.preventDefault();
                            setAddingTag(true);
                        }}
                    >
                        # Add tag
                    </button>

                    <div
                        className={`flex w-full rounded-full items-center justify-center px-4 ${
                            addingTag ? 'w-full' : 'hidden'
                        }`}
                    >
                        <p className="text-white">#</p>

                        <input
                            type="text"
                            name="file_tag"
                            id="file_tag"
                            className="bg-transparent flex-1 ml-1 px-1 outline-none focus:placeholder:text-gray-300 text-white"
                            placeholder="Enter tag"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                        />
                    </div>
                </div>
            ) : null}
        </form>
    );
}

export default UploadForm;
