import React, { useState } from 'react';
import { ClipboardCopyIcon, DocumentIcon } from '@heroicons/react/solid';
import { uploadFile } from '../../../requests/uploadRequests';
import { useDispatch } from 'react-redux';

function isFileImage(file: File) {
    return file && file['type'].split('/')[0] === 'image';
}

function UploadForm() {
    const dispatch = useDispatch();

    const [file, setFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState('');
    const [url, setUrl] = useState('');
    const [savedToClipboard, setSavedToClipboard] = useState(false);

    const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) {
            return;
        }

        if (isFileImage(e.target.files[0])) {
            const preview = URL.createObjectURL(e.target.files[0]);

            setFilePreview(preview);
        }

        setFile(e.target.files[0]);
        setSavedToClipboard(false);
        setUrl('');
    };

    const saveToClipboard = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();

        navigator.clipboard.writeText(url);

        setSavedToClipboard(true);
    };

    const openUrl = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        setSavedToClipboard(false);

        window.open(url);
    };

    return (
        <form className="w-80 flex flex-col items-center justify-center">
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
                    className="cursor-pointer w-28 h-10 flex items-center justify-center text-center bg-white text-gray-900"
                >
                    {file && !url ? 'Change' : 'Select'} file
                </label>

                <button
                    type="submit"
                    onClick={(e) => uploadFile(e, setUrl, dispatch, file)}
                    className="bg-gray-900 text-white px-10 h-10 ml-2 flex-1"
                >
                    Upload
                </button>
            </div>

            {!url && filePreview && file ? (
                <img
                    src={filePreview}
                    alt="file preview"
                    className="w-full mt-2"
                />
            ) : !url && file ? (
                <div className="flex mt-2">
                    <DocumentIcon className="text-white mr-1 h-6" />

                    <p className="text-white">File is ready for upload</p>
                </div>
            ) : url ? (
                <>
                    <button
                        className="w-40 h-10 bg-orange-200 mt-4"
                        onClick={openUrl}
                    >
                        Atvērt
                    </button>

                    <button
                        className="flex w-full pl-2 border-2 border-white items-center justify-center mt-4"
                        onClick={saveToClipboard}
                    >
                        <p className="text-white text-center truncate flex-1 my-2">
                            {url}
                        </p>

                        <div className="h-full flex items-center justify-center w-10 bg-black">
                            <ClipboardCopyIcon className="text-white h-6" />
                        </div>
                    </button>

                    {savedToClipboard ? (
                        <small className="text-black text-center mt-2">
                            Copied
                        </small>
                    ) : null}
                </>
            ) : null}
        </form>
    );
}

export default UploadForm;
