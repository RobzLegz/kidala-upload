import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';
import Spinner from '../Spinner';
import MyFile from './MyFile';

export interface MyFilesViewProps {
    loading?: boolean;
}

const MyFilesView: React.FC<MyFilesViewProps> = ({ loading = false }) => {
    const userInfo: UserInfo = useSelector(selectUser);

    return (
        <div className="w-full flex flex-col items-center justify-start">
            <div className="w-11/12 flex flex-col items-center justify-start max-w-[800px]">
                {userInfo.myFiles &&
                    userInfo.myFiles.map((myFile, i) => (
                        <MyFile file={myFile} key={i} />
                    ))}

                {loading && <Spinner size="8" />}
            </div>
        </div>
    );
};

export default MyFilesView;
