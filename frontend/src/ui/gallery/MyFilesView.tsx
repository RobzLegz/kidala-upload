import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';
import Spinner from '../Spinner';
import MyFile from './MyFile';
import NoFiles from './NoFiles';

export interface MyFilesViewProps {
    loading?: boolean;
    isProfile?: boolean;
}

const MyFilesView: React.FC<MyFilesViewProps> = ({
    loading = false,
    isProfile = false,
}) => {
    const userInfo: UserInfo = useSelector(selectUser);

    if ((isProfile && !userInfo.myFiles) || userInfo.myFiles?.length === 0) {
        return <NoFiles my />;
    }

    return (
        <div
            className={`flex flex-col items-center justify-start ${
                isProfile ? 'w-full' : 'w-11/12 max-w-[800px]'
            }`}
        >
            {userInfo.myFiles &&
                userInfo.myFiles.map((myFile, i) => (
                    <MyFile file={myFile} key={i} />
                ))}

            {loading && <Spinner size="8" />}
        </div>
    );
};

export default MyFilesView;
