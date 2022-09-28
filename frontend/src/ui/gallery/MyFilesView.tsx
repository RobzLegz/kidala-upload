import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';
import { detectFileType } from '../../utils/detectFileType';
import { generateFileUrl } from '../../utils/generateFileUrl';
import GalleryNonImage from './GalleryNonImage';
import MyFile from './MyFile';

const MyFilesView = () => {
    const userInfo: UserInfo = useSelector(selectUser);

    return (
        <div className="w-full flex items-start justify-center">
            <div className="w-11/12 flex flex-col items-center justify-start max-w-[800px]">
                {userInfo.myFiles &&
                    userInfo.myFiles.map((myFile, i) => (
                        <MyFile file={myFile} key={i} />
                    ))}
            </div>
        </div>
    );
};

export default MyFilesView;
