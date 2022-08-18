import {
    DocumentIcon,
    FolderOpenIcon,
    TrashIcon,
} from '@heroicons/react/solid';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppInfo, selectApp } from '../../redux/slices/appSlice';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';
import { deleteFile, getAllFiles } from '../../requests/adminRequests';
import { BASE_URL } from '../../requests/routes';
import { loginUser } from '../../requests/userRequests';

function AdminContainer() {
    const dispatch = useDispatch();

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

        await loginUser(username, password, dispatch);
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
                    name="username"
                    id="username"
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

    return (
        <div className="w-full min-h-screen flex items-start justify-start">
            <div className="w-full max-w-[700px] flex items-start justify-start flex-col">
                {appInfo.files &&
                    appInfo.files.map((file) => {
                        return (
                            <div
                                className="flex items-start justify-start w-full mb-2"
                                key={file.name}
                            >
                                {!file.name.includes('.png') &&
                                !file.name.includes('.jpg') &&
                                !file.name.includes('.gif') &&
                                !file.name.includes('.jpeg') &&
                                !file.name.includes('.svg') &&
                                !file.name.includes('.jfif') &&
                                !file.name.includes('.webp') ? (
                                    <div className="flex h-full items-center justify-center w-10">
                                        <DocumentIcon className="text-white h-8" />
                                    </div>
                                ) : (
                                    <Image
                                        src={`${BASE_URL}/${file.hash}`}
                                        alt={file.name}
                                        draggable={false}
                                        objectFit="cover"
                                        width={40}
                                        height={40}
                                    />
                                )}

                                <div className="flex-1 flex items-start justify-start h-full ml-2">
                                    <div className="flex flex-col justify-between items-start h-full w-full max-w-[300px]">
                                        <p className="text-white">
                                            {file.name}
                                        </p>

                                        <small className="text-gray-300">
                                            {file.hash}
                                        </small>
                                    </div>

                                    <button
                                        className="bg-green-500 h-8 w-12 flex items-center justify-center"
                                        onClick={() =>
                                            open(
                                                `https://46.109.36.103/${file.hash}`
                                            )
                                        }
                                    >
                                        <FolderOpenIcon className="text-white h-5" />
                                    </button>
                                    <button
                                        className="bg-red-500 h-8 w-8 flex items-center justify-center"
                                        onClick={() =>
                                            deleteFile(file._id.$oid, dispatch)
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
