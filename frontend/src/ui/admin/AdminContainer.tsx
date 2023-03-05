import {
    DocumentIcon,
    FolderOpenIcon,
    TrashIcon,
} from '@heroicons/react/20/solid';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppInfo, selectApp } from '../../redux/slices/appSlice';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';
import { deleteFile } from '../../requests/adminRequests';
import { getAllFiles } from '../../requests/fileRequests';
import { BASE_URL } from '../../requests/routes';
import { loginUser } from '../../requests/userRequests';

function AdminContainer() {
    const dispatch = useDispatch();
    const router = useRouter();

    const appInfo: AppInfo = useSelector(selectApp);
    const userInfo: UserInfo = useSelector(selectUser);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (!appInfo.files) {
            getAllFiles(dispatch);
        }
    }, []);

    const handleLogin = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();

        await loginUser(username, password, dispatch, router);
    };

    if (!userInfo.loggedIn) {
        return (
            <form className="w-full flex flex-col items-start justify-start p-2">
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="off"
                    className="w-48 h-6 outline px-2 text-sm"
                    placeholder="username"
                />

                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 w-48 h-6 outline px-2 text-sm"
                    placeholder="password"
                />

                <button
                    className="bg-white outline mt-2 px-2 text-sm py-1 hover:bg-slate-100"
                    onClick={handleLogin}
                >
                    Login
                </button>
            </form>
        );
    }

    if (!userInfo.info || userInfo.info.role !== 'admin') {
        return (
            <div className="w-full flex flex-col items-start justify-start p-2">
                <p className="text-white">
                    A tu kidala neesi? Pazūd no administratora paneļa jopta
                </p>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen flex items-start justify-start">
            <div className="w-full max-w-[700px] flex items-start justify-start flex-col">
                {appInfo.files &&
                    appInfo.files.map((file) => {
                        return (
                            <div
                                className="flex items-start justify-start w-full mb-2"
                                key={file.hash}
                            >
                                <div className="w-10 h-10 relative flex items-center justify-center mr-2">
                                    {!file.name.includes('.png') &&
                                    !file.name.includes('.jpg') &&
                                    !file.name.includes('.gif') &&
                                    !file.name.includes('.jpeg') &&
                                    !file.name.includes('.svg') &&
                                    !file.name.includes('.jfif') &&
                                    !file.name.includes('.webp') ? (
                                        <div className="flex h-full items-center justify-center w-full">
                                            <DocumentIcon className="text-white h-8" />
                                        </div>
                                    ) : (
                                        <Image
                                            src={`${BASE_URL}/${file.hash}`}
                                            alt={file.name}
                                            draggable={false}
                                            objectFit="cover"
                                            layout="fill"
                                        />
                                    )}
                                </div>

                                <div className="flex items-start justify-start h-full flex-1">
                                    <div className="flex flex-col justify-between items-start h-full flex-1 max-w-[200px] sm:max-w-[400px] pr-2 cursor-pointer">
                                        <p className="text-white truncate w-full text-left">
                                            {file.name}
                                        </p>

                                        <small className="text-gray-300 truncate w-full text-left">
                                            {file.hash}
                                        </small>
                                    </div>

                                    <button
                                        className="bg-green-500 h-8 w-10 flex items-center justify-center"
                                        onClick={() =>
                                            open(`${BASE_URL}/${file.hash}`)
                                        }
                                    >
                                        <FolderOpenIcon className="text-white h-5" />
                                    </button>

                                    <button
                                        className="bg-red-500 h-8 w-10 flex items-center justify-center"
                                        onClick={() =>
                                            deleteFile(file._id, dispatch)
                                        }
                                    >
                                        <TrashIcon className="text-white h-5" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default AdminContainer;
