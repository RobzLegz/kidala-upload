import { TrashIcon } from '@heroicons/react/20/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearNotification,
    setNotification,
} from '../../redux/slices/notificationSlice';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';
import { updateSelf } from '../../requests/userRequests';
import { detectFileType } from '../../utils/detectFileType';
import Button from '../Button';
import { Input } from '../Input';
import ProfileBanner from '../profile/ProfileBanner';
import ProfileUserIcon from '../profile/ProfileUserIcon';

const ProfileSettings = () => {
    const dispatch = useDispatch();

    const userInfo: UserInfo = useSelector(selectUser);

    const [username, setUsername] = useState<string>(
        userInfo.info?.username ? userInfo.info?.username : ''
    );
    const [name, setName] = useState<string>(
        userInfo.info?.name ? userInfo.info?.name : ''
    );
    const [bio, setBio] = useState<string>(
        userInfo.info?.bio ? userInfo.info?.bio : ''
    );
    const [file, setFile] = useState<File | null>(null);
    const [bannerfile, setBannerFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState(
        userInfo.info?.avatar ? userInfo.info?.avatar : ''
    );
    const [bannerPreview, setBannerPreview] = useState(
        userInfo.info?.banner ? userInfo.info?.banner : ''
    );
    const [changed, setChanged] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userInfo.info) {
            if (
                name !== userInfo.info.name ||
                username !== userInfo.info.username ||
                bio !== userInfo.info.bio ||
                (bannerPreview === '' && userInfo.info.banner) ||
                (avatarPreview === '' && userInfo.info.avatar) ||
                file ||
                bannerfile
            ) {
                setChanged(true);
            } else {
                setChanged(false);
            }
        }
    }, [
        userInfo.info,
        name,
        username,
        bio,
        file,
        bannerfile,
        bannerPreview,
        avatarPreview,
    ]);

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

    const handleUpdate = async () => {
        setLoading(true);

        await updateSelf({
            avatar: file,
            banner: bannerfile,
            avatarSrc: avatarPreview,
            bannerSrc: bannerPreview,
            username,
            dispatch,
            bio,
            name,
            token: userInfo.token,
            setAvatarPreview,
            setBannerPreview,
        });

        setFile(null);
        setBannerFile(null);
        setLoading(false);
    };

    useEffect(() => {
        if (userInfo.info) {
            setUsername(userInfo.info?.username ? userInfo.info?.username : '');
            setName(userInfo.info?.name ? userInfo.info?.name : '');
            setBio(userInfo.info?.bio ? userInfo.info?.bio : '');
            setAvatarPreview(
                userInfo.info?.avatar ? userInfo.info?.avatar : ''
            );
            setBannerPreview(
                userInfo.info?.banner ? userInfo.info?.banner : ''
            );
        }
    }, [userInfo.info]);

    if (!userInfo.info) {
        return null;
    }

    return (
        <div className="flex flex-col flex-1 items-start justify-start md:ml-8">
            <div className="w-full max-w-[800px] flex flex-col items-center justify-start">
                <div className="flex flex-col items-start justify-start rounded-lg w-full p-2 sm:p-4 dreineris_konteineris">
                    <strong className="text-white text-lg">
                        Profile picture
                    </strong>

                    <div className="flex mt-2 p-4 rounded-lg bg-primary-900 w-full">
                        <ProfileUserIcon
                            className="relative"
                            tempAvatar={avatarPreview}
                            isEdit
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
                                    <p className="hidden sm:block">
                                        Change profile picture
                                    </p>
                                    <p className="block sm:hidden">
                                        Change avatar
                                    </p>
                                </Button>

                                {avatarPreview && (
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
                        <ProfileBanner tempAvatar={bannerPreview} isEdit />

                        <div className="flex w-full items-start justify-start flex-col sm:flex-row sm:items-center sm:justify-between p-2 sm:p-4">
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

                                {bannerPreview && (
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
                        <div className="flex w-full flex-col sm:flex-row">
                            <div className="flex flex-col sm:w-1/2 sm:pr-2">
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
                                    maxLength={30}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    className="w-full"
                                    placeholder="Enter username"
                                />
                            </div>

                            <div className="flex flex-col sm:w-1/2 sm:pl-2 mt-2 sm:mt-0">
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
                                    maxLength={30}
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
                                className="w-full min-h-[120px]"
                                placeholder="Enter bio"
                                textarea
                                maxLength={200}
                            />
                        </div>
                    </div>

                    <div className="flex mt-4">
                        <Button
                            size="small"
                            onClick={handleUpdate}
                            disabled={!changed}
                            loading={loading}
                        >
                            Save changes
                        </Button>

                        <Button
                            size="small"
                            color="primary-300"
                            className="ml-4"
                            disabled={!changed || loading}
                        >
                            Reset
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
