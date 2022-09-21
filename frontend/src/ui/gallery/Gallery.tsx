import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useWindowSize from '../../hooks/useWindowSize';
import { isServer } from '../../lib/isServer';
import { AppInfo, selectApp } from '../../redux/slices/appSlice';
import { getFilesV2 } from '../../requests/fileRequests';

const Gallery = () => {
    const windowSize = useWindowSize();

    const appInfo: AppInfo = useSelector(selectApp);

    const [amount, setAmount] = useState(20); //amount of files
    const [cursor, setCursor] = useState(0); //start to receive from here
    const [loading, setLoading] = useState(true); //start to receive from here

    const handleScroll = () => {
        if (windowSize.height) {
            const docHeight = document.documentElement.scrollHeight;
            const scrollTop = document.documentElement.scrollTop;

            if (windowSize.height + scrollTop + 1 >= docHeight) {
                setAmount(amount + 1);
                setLoading(true);
            }
        }
    };

    useEffect(() => {
        const fetchFiles = async () => {
            await getFilesV2();
        };

        fetchFiles().then(() => {
            setLoading(false);
        });
    }, [cursor]);

    useEffect(() => {
        if (!isServer && windowSize.height) {
            window.addEventListener('scroll', handleScroll);

            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <div className="mt-2 grid grid-cols-3 place-content-center w-full overflow-hidden xl:grid-cols-4 2xl:grid-cols-5 gap-2"></div>
    );
};

export default Gallery;
