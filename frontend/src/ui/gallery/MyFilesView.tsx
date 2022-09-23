import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';
import { detectFileType } from '../../utils/detectFileType';
import { generateFileUrl } from '../../utils/generateFileUrl';
import GalleryNonImage from './GalleryNonImage';

const MyFilesView = () => {
    const userInfo: UserInfo = useSelector(selectUser);

    return (
        <div className="w-full flex items-start justify-center">
            <div className="w-11/12 flex flex-col items-center justify-start max-w-[800px]">
                {userInfo.myFiles &&
                    userInfo.myFiles.map((myFile, i) => (
                        <div className="w-full bg-primary-800 border border-primary-700 p-2 rounded-lg flex items-start justify-start" key={i}>
                            {detectFileType(myFile.name) === 'image' ? (
                                <Image
                                    src={generateFileUrl(
                                        myFile.hash,
                                        myFile.name
                                    )}
                                    width={100}
                                    height={60}
                                    objectFit="cover"
                                />
                            ) : (
                                <GalleryNonImage filename={myFile.name} />
                            )}

                            <div className="h-full flex flex-col ml-2">
                                <strong className='text-white'>{myFile.name}</strong>

                                <p className='text-primary-100'>{myFile.description}</p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default MyFilesView;
