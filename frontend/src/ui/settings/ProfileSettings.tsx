import { TrashIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearNotification,
    setNotification,
} from '../../redux/slices/notificationSlice';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';
import { detectFileType } from '../../utils/detectFileType';
import Button from '../Button';
import { Input } from '../Input';
import ProfileBanner from '../profile/ProfileBanner';
import ProfileUserIcon from '../profile/ProfileUserIcon';

const ProfileSettings = () => {
    const dispatch = useDispatch();

    const userInfo: UserInfo = useSelector(selectUser);

    const [username, setUsername] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [bannerfile, setBannerFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState('');
    const [bannerPreview, setBannerPreview] = useState('');

    const handleFileSelect = (
        e: React.ChangeEvent<HTMLInputElement>,
        isBanner?: boolean
    ) => {
        if (e.target.files && e.target.files[0]) {
            selectFile && selectFile(e.target.files, isBanner);
        }
    };

    const selectFile = (files: FileList, isBanner?: boolean) => {
        if (!files || files.length === 0) {
            return;
        }

        const selectedFile = files[0];

        if (
            isBanner
                ? selectedFile.size > 5 * 1024 * 1024
                : selectedFile.size > 3 * 1024 * 1024
        ) {
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

            if (isBanner) {
                setBannerPreview(preview);
            } else {
                setAvatarPreview(preview);
            }
        } else {
            if (isBanner) {
                setBannerPreview('');
            } else {
                setAvatarPreview('');
            }
        }

        dispatch(clearNotification());
        if (isBanner) {
            setBannerFile(selectedFile);
        } else {
            setFile(selectedFile);
        }
    };

    const removeImg = (isBanner?: boolean) => {
        if (isBanner) {
            setBannerFile(null);
            setBannerPreview('');
        } else {
            setFile(null);
            setAvatarPreview('');
        }
    };

    return (
        <div className="flex flex-col flex-1 items-start justify-start mx-8">
            <div className="w-11/12 max-w-[800px] flex flex-col items-center justify-start">
                <div className="flex flex-col items-start justify-start rounded-lg w-full p-4 dreineris_konteineris">
                    <strong className="text-white text-lg">
                        Profile picture
                    </strong>

                    <div className="flex mt-2 p-4 rounded-lg bg-primary-900 w-full">
                        <ProfileUserIcon
                            className="relative"
                            tempAvatar={avatarPreview}
                        />

                        <div className="flex h-20 flex-col items-start justify-center ml-4">
                            <div className="flex items-center justify-center">
                                <input
                                    type="file"
                                    name="change_profile_icon"
                                    id="change_profile_icon"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                />

                                <Button
                                    isLabel
                                    htmlFor="change_profile_icon"
                                    color="primary-300"
                                    size="small"
                                    className=" h-8"
                                >
                                    Change profile picture
                                </Button>

                                {userInfo.info?.avatar && (
                                    <Button
                                        color="primary-300"
                                        size="small"
                                        className="ml-2 h-8 w-8"
                                        onClick={() => removeImg(false)}
                                    >
                                        <TrashIcon className="text-white h-4" />
                                    </Button>
                                )}
                            </div>

                            <small className="text-primary-300 mt-2">
                                Maximum file size 3MB.
                            </small>
                        </div>
                    </div>

                    <strong className="text-white text-lg mt-4">
                        Profile banner
                    </strong>

                    <div className="flex flex-col mt-2 rounded-lg bg-primary-900 w-full">
                        <ProfileBanner tempAvatar={bannerPreview} />

                        <div className="flex w-full items-center justify-between p-4">
                            <div className="flex">
                                <input
                                    type="file"
                                    name="change_profile_banner"
                                    id="change_profile_banner"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleFileSelect(e, true)}
                                />

                                <Button
                                    isLabel
                                    htmlFor="change_profile_banner"
                                    color="primary-300"
                                    size="small"
                                    className="h-8"
                                >
                                    Change profile banner
                                </Button>

                                {(userInfo.info?.banner || bannerPreview) && (
                                    <Button
                                        color="primary-300"
                                        size="small"
                                        className="ml-2 h-8 w-8"
                                        onClick={() => removeImg(true)}
                                    >
                                        <TrashIcon className="text-white h-4" />
                                    </Button>
                                )}
                            </div>

                            <small className="text-primary-300 mt-2">
                                Maximum file size 5MB.
                            </small>
                        </div>
                    </div>

                    <strong className="text-white text-lg mt-4">
                        Public profile
                    </strong>

                    <div className="flex flex-col mt-2 w-full">
                        <div className="flex w-full">
                            <div className="flex flex-col w-1/2 pr-2">
                                <label
                                    htmlFor="edit_username"
                                    className="text-primary-300 mb-1"
                                >
                                    Username
                                </label>

                                <Input
                                    type="text"
                                    name="edit_username"
                                    id="edit_username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    className="w-full"
                                    placeholder="Enter username"
                                />
                            </div>

                            <div className="flex flex-col w-1/2 pl-2">
                                <label
                                    htmlFor="edit_name"
                                    className="text-primary-300 mb-1"
                                >
                                    Name
                                </label>

                                <Input
                                    type="text"
                                    name="edit_name"
                                    id="edit_name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full"
                                    placeholder="Enter your name"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col w-full mt-2">
                            <label
                                htmlFor="edit_bio"
                                className="text-primary-300 mb-1"
                            >
                                Bio
                            </label>

                            <Input
                                type="text"
                                name="edit_bio"
                                id="edit_bio"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="w-full h-28"
                                placeholder="Enter bio"
                                textarea
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
