import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { windowSizes } from '../../constants/windowSizes';
import useWindowSize from '../../hooks/useWindowSize';
import { isServer } from '../../lib/isServer';
import { getUserFiles } from '../../requests/userRequests';
import { useRouter } from 'next/router';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';
import MyFilesView from './MyFilesView';

const user_token = !isServer ? localStorage.getItem('access_token') : null;

export interface MyFilesContainerProps {
    isProfile?: boolean;
}

const MyFilesContainer: React.FC<MyFilesContainerProps> = ({ isProfile = false }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const windowSize = useWindowSize();

    const userInfo: UserInfo = useSelector(selectUser);

    const [limit, setLimit] = useState<number>(15); //amount of files to receive
    const [prevCursor, setPrevCursor] = useState(0); //amount of files previously received
    const [loading, setLoading] = useState(true); //start to receive from here

    const handleScroll = () => {
        if (windowSize.height) {
            const docHeight = document.documentElement.scrollHeight;
            const scrollTop = document.documentElement.scrollTop;

            if (windowSize.height + scrollTop + 1 >= docHeight) {
                setLoading(true);
            }
        }
    };

    useEffect(() => {
        if (userInfo.info && loading) {
            if (!user_token) {
                setLoading(false);
                router.push('/login');
                return;
            }

            if (
                userInfo.myFiles &&
                userInfo.myFiles.length >= Number(userInfo.info?.files.length)
            ) {
                setLoading(false);
                return;
            }

            const fetchFiles = async () => {
                if (
                    userInfo.myFiles &&
                    userInfo.myFiles.length === prevCursor
                ) {
                    return;
                }

                userInfo.myFiles && setPrevCursor(userInfo.myFiles.length);

                await getUserFiles({
                    cursor: userInfo.myFiles ? userInfo.myFiles.length : 0,
                    limit: limit,
                    dispatch,
                    token: user_token,
                });
            };

            fetchFiles().then(() => {
                setLoading(false);

                if (limit === 10) {
                    setLimit(8);
                }
            });
        }
    }, [loading, userInfo.info]);

    useEffect(() => {
        if (
            !isServer &&
            windowSize.height &&
            userInfo.info &&
            userInfo.myFiles &&
            userInfo.myFiles.length < Number(userInfo.info?.files.length) &&
            limit
        ) {
            window.addEventListener('scroll', handleScroll);

            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [windowSize.height, userInfo.myFiles, limit, userInfo.info]);

    return <MyFilesView loading={loading} isProfile={isProfile} />;
};

export default MyFilesContainer;
