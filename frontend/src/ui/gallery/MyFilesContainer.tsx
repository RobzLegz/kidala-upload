import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { windowSizes } from '../../constants/windowSizes';
import useWindowSize from '../../hooks/useWindowSize';
import { isServer } from '../../lib/isServer';
import { AppInfo, selectApp } from '../../redux/slices/appSlice';
import { getUserFiles } from '../../requests/userRequests';
import { useRouter } from 'next/router';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';

const user_token = !isServer ? localStorage.getItem('access_token') : null;

const MyFilesContainer = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const windowSize = useWindowSize();

    const appInfo: AppInfo = useSelector(selectApp);
    const userInfo: UserInfo = useSelector(selectUser);

    const [limit, setLimit] = useState<number | null>(null); //amount of files to receive
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
        if (windowSize.width) {
            if (windowSize.width < windowSizes.xl) {
                setLimit(9);
            } else if (windowSize.width >= windowSizes.xl) {
                setLimit(12);
            }
        }
    }, [windowSize.width]);

    useEffect(() => {
        if (userInfo.myFiles && loading) {
            const fetchFiles = async () => {
                if (!userInfo.myFiles || !limit) {
                    return;
                }

                if (userInfo.myFiles.length === prevCursor) {
                    return;
                }

                if (!user_token) {
                    router.push('/new/login');
                    return;
                }

                setPrevCursor(userInfo.myFiles.length);

                await getUserFiles({
                    cursor: userInfo.myFiles.length,
                    limit: limit,
                    dispatch,
                    token: user_token,
                });
            };

            fetchFiles().then(() => {
                setLoading(false);
            });
        }
    }, [userInfo.myFiles, loading]);

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

    useEffect(() => {
        if (!user_token) {
            router.push('/new/login');
            return;
        }

        const fetchFiles = async () => {
            if (!userInfo.info) {
                return;
            }

            if (!userInfo.myFiles || !limit) {
                await getUserFiles({
                    cursor: 0,
                    limit: 20,
                    dispatch,
                    token: user_token,
                });

                return;
            }

            if (userInfo.myFiles.length === prevCursor) {
                return;
            }

            if (
                userInfo.myFiles.length >= Number(userInfo.info?.files.length)
            ) {
                return;
            }

            setPrevCursor(userInfo.myFiles.length);

            await getUserFiles({
                cursor: userInfo.myFiles.length,
                limit: limit,
                dispatch,
                token: user_token,
            });
        };

        fetchFiles().then(() => {
            setLoading(false);
        });
    }, []);

    return <div>MyFilesContainer</div>;
};

export default MyFilesContainer;
